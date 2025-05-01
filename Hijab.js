import React, { useContext } from "react";
import { FaShoppingCart, FaHeart, FaInstagram } from "react-icons/fa";
import { ShopContext } from "../shopContext";
import { useNavigate, Link } from "react-router-dom";

const COLORS = [
  "Black", "White", "Gray", "Pink", "Blue", "Green", "Yellow", "Purple", "Brown", "Maroon", "Teal", "Navy", "Peach", "Olive", "Gold", "Silver", "Red", "Orange"
];



const SORTS = [
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Color: A-Z", value: "color_asc" },
  { label: "Color: Z-A", value: "color_desc" }
];

function sortHijabs(hijabs, sort) {
  switch (sort) {
    case "price_asc": return [...hijabs].sort((a,b) => a.price-b.price);
    case "price_desc": return [...hijabs].sort((a,b) => b.price-a.price);
    case "color_asc": return [...hijabs].sort((a,b) => a.color.localeCompare(b.color));
    case "color_desc": return [...hijabs].sort((a,b) => b.color.localeCompare(a.color));
    default: return hijabs;
  }
}

const Hijab = () => {
  const HIJABS = React.useMemo(() => COLORS.map((color, i) => ({
    id: i+1,
    color,
    price: Math.floor(Math.random() * 1001) + 1000, // 1000-2000
    img: `https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80`,
    rating: Math.floor(Math.random() * 2) + 4 // 4 or 5 stars
  })), []);
  const { addToCart, addToWishlist } = useContext(ShopContext);
  const navigate = useNavigate();
  const [sort, setSort] = React.useState("");
  const sorted = sortHijabs(HIJABS, sort);

  const handleAddToCart = (item) => {
    addToCart(item);
    navigate("/cart");
  };
  const handleAddToWishlist = (item) => {
    addToWishlist(item);
    navigate("/wishlist");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-50 flex flex-col justify-between">
    <div>
      <div className="flex flex-col items-center pt-8 pb-2">
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
        <h2 className="text-3xl font-bold text-pink-700 mb-2 tracking-wide text-center">AVAILABLE HIJABS</h2>
        <div className="text-md text-gray-600 mb-2 text-center">STUFF: GEORGETTE HIJAB, LAWN HIJAB</div>
        <div className="flex flex-col items-center w-full mb-6">
          <select value={sort} onChange={e=>setSort(e.target.value)} className="border rounded px-3 py-2 focus:outline-pink-400 w-48 text-center">
            <option value="">Sort By</option>
            {SORTS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4 md:px-10">
        {sorted.map(d => (
          <div key={d.id} className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center relative">
            <button onClick={()=>handleAddToCart({
  id: d.id,
  name: d.color + " Hijab",
  price: d.price,
  img: d.img,
  quantity: 1
})} className="absolute top-2 left-2 bg-white/80 rounded-full p-1 text-pink-600 hover:text-pink-900 text-xl shadow z-10" title="Add to Cart"><FaShoppingCart /></button>
<button onClick={()=>handleAddToWishlist({
  id: d.id,
  name: d.color + " Hijab",
  price: d.price,
  img: d.img,
  quantity: 1
})} className="absolute top-2 right-2 bg-white/80 rounded-full p-1 text-yellow-600 hover:text-yellow-900 text-xl shadow z-10" title="Add to Wishlist"><FaHeart /></button>
            <div className="relative w-72 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[440px] mb-2">
  <img
    src={d.img}
    alt={d.color}
    className="w-full h-full object-cover rounded border"
    onError={e => (e.target.src = "https://via.placeholder.com/320x384?text=Hijab")}
  />
</div>
            <div className="font-semibold text-lg text-pink-700 mb-1">{d.color}</div>
            <div className="flex items-center mb-1">
              {Array.from({length: d.rating}).map((_, idx) => (<span key={idx} className="text-yellow-400 text-lg">★</span>))}
              {Array.from({length: 5 - d.rating}).map((_, idx) => (<span key={idx} className="text-gray-300 text-lg">★</span>))}
            </div>
            <div className="mb-2">
              <span className="inline-block text-xl font-bold text-pink-700 bg-pink-100 px-4 py-1 rounded shadow border border-pink-200 tracking-wide">PKR {d.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
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
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        {/* Large Instagram Icon for Home Page Only */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center md:items-end md:justify-end mt-8 md:mt-0">
          <a href="https://www.instagram.com/hijab_e_zehraa_?igsh=NGdjcW03eTQ4Y2p0" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-pink-600 hover:text-pink-800 transition-colors" style={{fontSize: '70px'}}>
            <FaInstagram />
          </a>
          <div className="text-pink-700 font-semibold text-lg mt-2">Follow us on Instagram</div>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-1">We Accept</div>
          <div className="flex gap-2 mb-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-6" />
          </div>

          <div className="text-xs text-gray-500"> 2025, MAMAA Powered by Cascade</div>
        </div>
        <div className="flex items-center mt-4 md:mt-0 md:ml-auto">
          <a href="https://www.instagram.com/hijab_e_zehraa_?igsh=NGdjcW03eTQ4Y2p0" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-pink-600 text-3xl hover:text-pink-800 transition-colors ml-4">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  </div>
);
};
export default Hijab;
