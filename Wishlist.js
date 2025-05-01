import React, { useContext } from "react";
import { ShopContext } from "../shopContext";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
    navigate('/cart');
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-200">
      <h1 className="text-3xl font-bold text-pink-700 mb-4">Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-700">Your wishlist is empty.</p>
      ) : (
        <ul className="w-full max-w-md px-2 sm:px-0">
          {wishlist.map((item, idx) => (
            <li key={item.id || idx} className="bg-white rounded-lg shadow p-4 mb-2 flex items-center justify-between">
              <div className="flex items-center">
                <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded mr-4" />
                <div>
                  <div className="font-semibold text-pink-700">{item.name}</div>
                  <div className="text-gray-700">PKR {item.price}</div>
                  <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => removeFromWishlist(item.id)} className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">Remove</button>
                <button onClick={() => handleMoveToCart(item)} className="px-3 py-1 bg-pink-100 text-pink-700 rounded hover:bg-pink-200">Move to Cart</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
