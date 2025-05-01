import React, { useContext, useState } from "react";
import { ShopContext } from "../shopContext";
import { useNavigate } from "react-router-dom";
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51RGNnjBQ3leqxB255fCIbFBQ9jN6MYEqc7pgCa8KwPo7DAMVX5VtGlFRW5x3Bav8Pe722XSPFfuAV7fFxxg4PXCk004urEkBSJ");

function Checkout() {
  const { cart, clearCart } = useContext(ShopContext);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", shipping: "", payment: "COD" });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // Stripe hooks at top level (per React rules)
  const stripe = useStripe();
  const elements = useElements();

  const grandTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    // COD flow: Save order to backend with paymentStatus: Pending, paymentMethod: COD
    if (form.payment === "COD") {
      const res = await fetch("/ordersdetail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: cart,
          grandTotal,
          paymentStatus: "Pending",
          paymentMethod: "COD"
        })
      });
      if (res.ok) {
        setMessage("✅ Order placed successfully! Pay cash on delivery.");
        clearCart();
        setTimeout(() => navigate("/"), 3000);
      } else {
        setMessage("❌ Failed to place order. Please try again.");
      }
      setSubmitting(false);
    } else {
      // Stripe Elements payment flow
      if (!stripe || !elements) {
        setMessage("Stripe is not loaded. Please try again.");
        setSubmitting(false);
        return;
      }
      try {
        const cardElement = elements.getElement(CardElement);
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: form.name,
            email: form.email,
            address: { line1: form.address }
          }
        });
        if (error) {
          setMessage(error.message);
          setSubmitting(false);
          return;
        }
        // 1. Stripe payment on backend
        const paymentRes = await fetch("/api/pay-with-stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            amount: grandTotal * 100, // Stripe expects cents
            ...form,
            items: cart,
            grandTotal
          })
        });
        const paymentData = await paymentRes.json();
        if (!paymentRes.ok || !paymentData.success) {
          setMessage("❌ Stripe payment failed: " + (paymentData.message || 'Unknown error'));
          setSubmitting(false);
          return;
        }
        // 2. Save order to /ordersdetail (so all orders go to same collection)
        const orderRes = await fetch("/ordersdetail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            items: cart,
            grandTotal,
            paymentStatus: "Paid",
            paymentMethod: "Stripe",
            stripePaymentId: paymentData.paymentIntentId || undefined
          })
        });
        if (orderRes.ok) {
          setMessage("✅ Payment successful! Order placed.");
          clearCart();
          setTimeout(() => navigate("/"), 3000);
        } else {
          setMessage("❌ Payment succeeded but order not saved! Please contact support.");
        }
      } catch (err) {
        setMessage("❌ Stripe payment failed. " + err.message);
      }
      setSubmitting(false);
    }
  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-200">
      <h1 className="text-3xl font-bold text-pink-700 mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 sm:p-8 w-full max-w-lg flex flex-col gap-4">
        <input required name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2" />
        <input required name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} className="border rounded px-3 py-2" />
        <input required name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="border rounded px-3 py-2" />
        <input required name="address" placeholder="Address" value={form.address} onChange={handleChange} className="border rounded px-3 py-2" />
        <input name="shipping" placeholder="Shipping Method (optional)" value={form.shipping} onChange={handleChange} className="border rounded px-3 py-2" />
        <div className="flex gap-4 items-center">
          <label className="font-semibold">Payment Method:</label>
          <select name="payment" value={form.payment} onChange={handleChange} className="border rounded px-2 py-1">
            <option value="COD">COD</option>
            <option value="Stripe">Stripe</option>
          </select>
        </div>
        {form.payment === "Stripe" && (
          <div className="my-2 p-4 border rounded">
            <CardElement options={{hidePostalCode: true}} />
            <div className="text-xs text-gray-500 mt-2">Use Stripe test card: 4242 4242 4242 4242, any future date, any CVC.</div>
          </div>
        )}
        <div className="font-bold text-lg text-pink-700">Grand Total: PKR {grandTotal}</div>
        <button type="submit" disabled={submitting} className="bg-gradient-to-r from-yellow-300 to-pink-400 text-white font-semibold rounded-lg py-3 mt-2 shadow hover:from-pink-400 hover:to-yellow-300 transition-all disabled:opacity-60">
          {submitting ? "Placing Order..." : form.payment === "COD" ? "Place Order (COD)" : "Pay with Stripe"}
        </button>
      </form>
      {message && <div className="mt-4 text-pink-700 font-medium">{message}</div>}
    </div>
  );
}

// Wrap Checkout with Stripe Elements
export function CheckoutWithStripe(props) {
  return (
    <Elements stripe={stripePromise}>
      <Checkout {...props} />
    </Elements>
  );
}

export default CheckoutWithStripe;
