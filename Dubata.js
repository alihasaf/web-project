import React, { useContext, useState } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ShopContext } from "../shopContext";
import { useNavigate } from "react-router-dom";

const COLORS = [
  "Red", "Blue", "Green", "Yellow", "Purple", "Pink", "Black", "White", "Gray", "Brown", "Orange", "Maroon", "Teal", "Navy", "Peach", "Olive", "Gold", "Silver"
];
const DUBATAS = COLORS.map((color, i) => ({
  id: i+1,
  color,
  price: Math.floor(Math.random() * 2001) + 1000, // 1000-3000
  img: `https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80`,
  rating: Math.floor(Math.random() * 2) + 4 // 4 or 5 stars
}));

const SORTS = [
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Color: A-Z", value: "color_asc" },
  { label: "Color: Z-A", value: "color_desc" }
];

function sortDubatas(dubatas, sort) {
  switch (sort) {
    case "price_asc": return [...dubatas].sort((a,b) => a.price-b.price);
    case "price_desc": return [...dubatas].sort((a,b) => b.price-a.price);
    case "color_asc": return [...dubatas].sort((a,b) => a.color.localeCompare(b.color));
    case "color_desc": return [...dubatas].sort((a,b) => b.color.localeCompare(a.color));
    default: return dubatas;
  }
}

export default function Dubata() {
  const { addToCart, addToWishlist } = useContext(ShopContext);
  const navigate = useNavigate();
  const [sort, setSort] = useState("");
  const sorted = sortDubatas(DUBATAS, sort);

  const handleAddToCart = (item) => {
    addToCart(item);
    navigate("/cart");
  };
  const handleAddToWishlist = (item) => {
    addToWishlist(item);
    navigate("/wishlist");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 to-pink-100">
      {/* Video */}
      <div className="w-full flex justify-center mb-4">
        <video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          autoPlay
          loop
          muted
          className="rounded-lg shadow object-cover w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[520px] max-w-4xl"
          style={{background:'#eee'}}
        />
      </div>
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-pink-700 my-4 tracking-wide">AVAILABLE DUBATA'S</h2>
      {/* Sort Dropdown */}
      <div className="flex justify-center mb-4">
        <select value={sort} onChange={e=>setSort(e.target.value)} className="border rounded px-3 py-2 focus:outline-pink-400">
          <option value="">Sort by</option>
          {SORTS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4 md:px-10">
        {sorted.map(d => (
          <div key={d.id} className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center relative">
            <div className="relative w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-96 lg:w-96 lg:h-[440px] mb-2">
  <img
    src={d.img}
    alt={d.color}
    className="w-full h-full object-cover rounded border"
    onError={e => (e.target.src = "https://via.placeholder.com/320x384?text=Dubata")}
  />
</div>
            <div className="font-semibold text-lg text-pink-700 mb-1">{d.color}</div>
            <div className="flex items-center mb-1">
              {Array.from({length: d.rating}).map((_, idx) => (
                <span key={idx} className="text-yellow-400 text-lg">★</span>
              ))}
              {Array.from({length: 5 - d.rating}).map((_, idx) => (
                <span key={idx} className="text-gray-300 text-lg">★</span>
              ))}
            </div>
            <div className="mb-2">
              <span className="inline-block text-xl font-bold text-pink-700 bg-pink-100 px-4 py-1 rounded shadow border border-pink-200 tracking-wide">PKR {d.price}</span>
            </div>
            <div className="flex w-full justify-between mt-2">
              <button onClick={()=>handleAddToCart({
                id: d.id,
                name: d.color + " Dubata",
                price: d.price,
                img: d.img,
                quantity: 1
              })}
                className="text-pink-600 hover:text-pink-900 text-xl" title="Add to Cart">
                <FaShoppingCart />
              </button>
              <button onClick={()=>handleAddToWishlist({
                id: d.id,
                name: d.color + " Dubata",
                price: d.price,
                img: d.img,
                quantity: 1
              })}
                className="text-yellow-600 hover:text-yellow-900 text-xl" title="Add to Wishlist">
                <FaHeart />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <footer className="mt-16 bg-white py-8 border-t shadow-inner">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">CUSTOMER CARE</h3>
            <ul className="text-gray-700 space-y-1">
              <li>ORDER TRACKING</li>
              <li>SHIPPING & HANDLING</li>
              <li>EXCHANGE POLICY</li>
              <li>ORDER CANCELLATION POLICY</li>
              <li>PRIVACY POLICY</li>
              <li>TERMS OF USE</li>
              <li>FAQ'S</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">INFORMATION</h3>
            <ul className="text-gray-700 space-y-1">
              <li>ABOUT US</li>
              <li>CONTACT US</li>
              <li>CAREERS</li>
              <li>STORE LOCATOR</li>
              <li>BLOGS</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center mt-8">
          <div className="flex gap-4 mb-2">
            <button type="button" className="text-blue-600 text-2xl" aria-label="Facebook"><i className="fab fa-facebook-square"></i></button>
            <button type="button" className="text-pink-500 text-2xl" aria-label="Instagram"><i className="fab fa-instagram"></i></button>
            <button type="button" className="text-red-600 text-2xl" aria-label="YouTube"><i className="fab fa-youtube"></i></button>
          </div>
          <div className="mb-1">We Accept</div>
          <div className="flex gap-2 mb-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-6" />
          </div>
          <div className="text-xs text-gray-500">© 2025, MAMAA Powered by Cascade</div>
        </div>
      </footer>
      {/* Limelight-style Footer */}
      <footer className="bg-white/90 border-t shadow-inner mt-16 px-4 py-10 text-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 pb-8">
          {/* Customer Care */}
          <div>
            <div className="font-bold text-lg mb-4 tracking-wider">CUSTOMER CARE</div>
            <ul className="space-y-2 text-sm">
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
      </footer>
    </div>
  );
}
