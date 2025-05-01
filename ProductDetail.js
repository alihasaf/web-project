import React, { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShopContext } from "../shopContext";

export default function ProductDetail() {
  // Get product id or name from URL
  const { slug } = useParams();

  // For now, use placeholder data. In real app, fetch product by slug/id.
  // You can later replace this with a real API call or context lookup.
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useContext(ShopContext);

  const product = {
    id: slug || "product-id",
    name: slug?.replace(/-/g, " ") || "Product Name",
    img: "https://via.placeholder.com/400x500?text=Product+Image",
    price: 5999,
    description: "This is a detailed description of the product. You can add fabric, color, size, and other details here.",
    details: [
      { label: "Fabric", value: "Lawn" },
      { label: "Color", value: "Black" },
      { label: "Weight", value: "250g" },
    ],
  };

  function handleAddToCart() {
    addToCart({ id: product.id, name: product.name, price: product.price, img: product.img, quantity: 1 });
    navigate("/cart");
  }
  function handleAddToWishlist() {
    addToWishlist({ id: product.id, name: product.name, price: product.price, img: product.img, quantity: 1 });
    navigate("/wishlist");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 flex flex-col">
      <div className="flex flex-col md:flex-row max-w-5xl mx-auto bg-white rounded-2xl shadow-xl mt-8 mb-8 overflow-hidden">
        {/* Image Section */}
        <div className="md:w-1/2 flex items-center justify-center bg-gray-50 p-6">
          <img
            src={product.img}
            alt={product.name}
            className="w-full max-w-xs md:max-w-md rounded-xl object-cover shadow-md"
          />
        </div>
        {/* Details Section */}
        <div className="md:w-1/2 p-6 flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-700 mb-2">{product.name}</h2>
          <div className="text-pink-700 font-bold text-2xl md:text-3xl mb-2">PKR {product.price}</div>
          <div className="text-gray-700 mb-4">{product.description}</div>
          <ul className="mb-4">
            {product.details.map((d, i) => (
              <li key={i} className="text-gray-600 text-sm md:text-base"><span className="font-semibold">{d.label}:</span> {d.value}</li>
            ))}
          </ul>
          <div className="flex gap-3">
            <button
              className="bg-pink-700 text-white py-2 px-6 rounded-lg font-bold text-lg hover:bg-pink-800 transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="bg-pink-100 text-pink-700 py-2 px-6 rounded-lg font-bold text-lg border border-pink-300 hover:bg-pink-200 transition"
              onClick={handleAddToWishlist}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
      {/* Limelight-style Footer */}
      <footer className="bg-white/90 border-t shadow-inner mt-16 px-4 py-10 text-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 pb-8">
          {/* Customer Care */}
          <div>
            <div className="font-bold text-lg mb-4 tracking-wider">CUSTOMER CARE</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/order-tracking" className="hover:text-pink-600">ORDER TRACKING</Link></li>
              <li><Link to="/shipping-handling" className="hover:text-pink-600">SHIPPING & HANDLING</Link></li>
              <li><Link to="/exchange-policy" className="hover:text-pink-600">EXCHANGE POLICY</Link></li>
              <li><Link to="/order-cancellation-policy" className="hover:text-pink-600">ORDER CANCELLATION POLICY</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-pink-600">PRIVACY POLICY</Link></li>
              <li><Link to="/terms-of-use" className="hover:text-pink-600">TERMS OF USE</Link></li>
              <li><Link to="/faqs" className="hover:text-pink-600">FAQ'S</Link></li>
            </ul>
          </div>
          {/* Information */}
          <div>
            <div className="font-bold text-lg mb-4 tracking-wider">INFORMATION</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-pink-600">ABOUT US</Link></li>
              <li><Link to="/contact-us" className="hover:text-pink-600">CONTACT US</Link></li>
              <li><Link to="/careers" className="hover:text-pink-600">CAREERS</Link></li>
              <li><Link to="/store-locator" className="hover:text-pink-600">STORE LOCATOR</Link></li>
              <li><Link to="/blogs" className="hover:text-pink-600">BLOGS</Link></li>
            </ul>
          </div>
        </div>
        {/* Social & Payment */}
        <div className="flex flex-col items-center gap-3 pb-4">
          <div className="flex gap-4 text-2xl">
            <button type="button" className="text-blue-600" aria-label="Facebook"><i className="fab fa-facebook-square"></i></button>
            <button type="button" className="text-pink-500" aria-label="Instagram"><i className="fab fa-instagram"></i></button>
            <button type="button" className="text-red-600" aria-label="YouTube"><i className="fab fa-youtube"></i></button>
          </div>
          <div className="font-semibold text-base mt-2">We Accept</div>
          <div className="flex gap-2 mt-1">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-6" />
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 border-t pt-3">&copy; {new Date().getFullYear()} Hijabe Zehraa. Powered by Cascade</div>
      </footer>
    </div>
  );
}
