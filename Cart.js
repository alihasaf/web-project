import React, { useContext } from "react";
import { ShopContext } from "../shopContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateCartQty } = useContext(ShopContext);
  const navigate = useNavigate();
  const grandTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-yellow-100 to-pink-200 py-8">
      <h1 className="text-3xl font-bold text-pink-700 mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-2xl">
  {/* Table for md+ screens */}
  <div className="hidden md:block overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-pink-100">
          <th className="p-2">Product</th>
          <th className="p-2">Name</th>
          <th className="p-2">Price</th>
          <th className="p-2">Qty</th>
          <th className="p-2">Subtotal</th>
          <th className="p-2">Remove</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item) => (
          <tr key={item.id} className="border-b">
            <td className="p-2"><img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded" /></td>
            <td className="p-2 font-semibold">{item.name}</td>
            <td className="p-2">PKR {item.price}</td>
            <td className="p-2">
              <div className="flex items-center">
                <button onClick={() => updateCartQty(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="px-2 py-1 bg-pink-200 rounded-l disabled:opacity-60">-</button>
                <span className="px-3">{item.quantity}</span>
                <button onClick={() => updateCartQty(item.id, item.quantity + 1)} className="px-2 py-1 bg-pink-200 rounded-r">+</button>
              </div>
            </td>
            <td className="p-2">PKR {item.price * item.quantity}</td>
            <td className="p-2"><button onClick={() => removeFromCart(item.id)} className="text-red-600 font-bold">X</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  {/* Cards for mobile screens */}
  <div className="md:hidden flex flex-col gap-4">
    {cart.map((item) => (
      <div key={item.id} className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-center gap-4">
        <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded" />
        <div className="flex-1 w-full">
          <div className="font-semibold text-pink-700 text-lg">{item.name}</div>
          <div className="text-gray-700">PKR {item.price}</div>
          <div className="flex items-center mt-2">
            <button onClick={() => updateCartQty(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="px-2 py-1 bg-pink-200 rounded-l disabled:opacity-60">-</button>
            <span className="px-3">{item.quantity}</span>
            <button onClick={() => updateCartQty(item.id, item.quantity + 1)} className="px-2 py-1 bg-pink-200 rounded-r">+</button>
          </div>
          <div className="text-gray-700 mt-1">Subtotal: PKR {item.price * item.quantity}</div>
        </div>
        <button onClick={() => removeFromCart(item.id)} className="text-red-600 font-bold self-start sm:self-center">X</button>
      </div>
    ))}
  </div>

          <div className="flex justify-end mt-4">
            <div className="bg-pink-100 rounded-lg px-6 py-3 text-xl font-bold text-pink-700 shadow">Grand Total: PKR {grandTotal}</div>
          </div>
          <div className="flex justify-end mt-6">
            <button onClick={() => navigate("/checkout")}
              className="bg-gradient-to-r from-yellow-300 to-pink-400 text-white font-semibold rounded-lg px-8 py-3 shadow hover:from-pink-400 hover:to-yellow-300 transition-all">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

