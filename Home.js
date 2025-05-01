import React, { useContext, useState } from "react";
import WelcomePrompt from "../components/WelcomePrompt";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import HorizontalCarousel from "../components/HorizontalCarousel";
import { ShopContext } from "../shopContext";
import { FaHeart, FaInstagram, FaWhatsapp, FaRobot } from "react-icons/fa";

// Placeholder images for categories, new arrivals, and carousels
const placeholder = "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80";
const carouselImages = [
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1469398715555-76331a00a843?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
];
const headCapsTops = [
  { name: "Head Cap", img: placeholder },
  { name: "Top 1", img: placeholder },
  { name: "Top 2", img: placeholder },
  { name: "Head Cap 2", img: placeholder },
  { name: "Top 3", img: placeholder },
  { name: "Top 4", img: placeholder },
  { name: "Top 5", img: placeholder },
  { name: "Head Cap 3", img: placeholder },
  { name: "Head Cap 4", img: placeholder },
  { name: "Head Cap 5", img: placeholder },
  { name: "Head Cap 6", img: placeholder },
];
// (removed duplicate declaration below)
const categories = [
  {
    label: "Dubata",
    items: [
      { name: "Lawn", img: placeholder },
      { name: "Printed", img: placeholder },
      { name: "Embroidered", img: placeholder },
      { name: "Winter", img: placeholder },
    ],
  },
  {
    label: "Niqab",
    items: [
      { name: "Plain", img: placeholder },
      { name: "Embroidered", img: placeholder },
      { name: "Fancy", img: placeholder },
    ],
  },
  {
    label: "Hijab",
    items: [
      { name: "Cotton", img: placeholder },
      { name: "Silk", img: placeholder },
      { name: "Chiffon", img: placeholder },
    ],
  },
  {
    label: "Abaya",
    items: [
      { name: "Classic", img: placeholder },
      { name: "Fancy", img: placeholder },
      { name: "Embroidered", img: placeholder },
    ],
  },
];


const newArrivals = [
  { name: "3 Piece Lawn Suit-Embroidered (Pret)", img: placeholder, price: "Rs. 12,999" },
  { name: "3 Piece Lawn Suit-Paste Print (Pret)", img: placeholder, price: "Rs. 7,999" },
  { name: "3 Piece Lawn Suit-Embellished (Pret)", img: placeholder, price: "Rs. 13,999" },
  { name: "3 Piece Satin Suit-Embroidered (Pret)", img: placeholder, price: "Rs. 10,999" },
  { name: "3 Piece Lawn Suit-Embroidered (Pret)", img: placeholder, price: "Rs. 11,999" },
  { name: "2 Piece Lawn Shirt-Paste Print (Pret)", img: placeholder, price: "Rs. 4,499" },
  { name: "2 Piece Lawn Suit-Embroidered (Pret)", img: placeholder, price: "Rs. 7,899" },
  { name: "2 Piece Lawn Suit-Embroidered (Pret)", img: placeholder, price: "Rs. 8,999" },
  { name: "3 Piece Lawn Suit-Printed (Pret)", img: placeholder, price: "Rs. 8,499" },
  { name: "3 Piece Lawn Suit-Classic (Pret)", img: placeholder, price: "Rs. 9,999" },
  { name: "2 Piece Lawn Suit-Classic (Pret)", img: placeholder, price: "Rs. 5,499" },
  { name: "3 Piece Lawn Suit-Classic (Pret)", img: placeholder, price: "Rs. 8,999" },
  { name: "2 Piece Lawn Suit-Printed (Pret)", img: placeholder, price: "Rs. 6,499" },
  { name: "3 Piece Lawn Suit-Printed (Pret)", img: placeholder, price: "Rs. 10,499" },
  { name: "2 Piece Lawn Suit-Embroidered (Pret)", img: placeholder, price: "Rs. 7,499" },
  { name: "3 Piece Lawn Suit-Embroidered (Pret)", img: placeholder, price: "Rs. 12,499" },
  { name: "3 Piece Lawn Suit-Paste Print (Pret)", img: placeholder, price: "Rs. 8,499" },
  { name: "3 Piece Lawn Suit-Classic (Pret)", img: placeholder, price: "Rs. 9,499" },
  { name: "2 Piece Lawn Suit-Printed (Pret)", img: placeholder, price: "Rs. 5,999" },
  { name: "3 Piece Lawn Suit-Embroidered (Pret)", img: placeholder, price: "Rs. 13,499" },
  { name: "3 Piece Lawn Suit-Printed (Pret)", img: placeholder, price: "Rs. 11,499" },
  { name: "3 Piece Lawn Suit-Digital Print (Pret)", img: placeholder, price: "Rs. 9,799" },
  { name: "2 Piece Lawn Suit-Classic (Pret)", img: placeholder, price: "Rs. 6,299" },
  { name: "3 Piece Lawn Suit-Festive Edition", img: placeholder, price: "Rs. 14,499" },
  { name: "2 Piece Lawn Suit-Premium (Pret)", img: placeholder, price: "Rs. 8,199" },
  { name: "3 Piece Lawn Suit-Designer (Pret)", img: placeholder, price: "Rs. 15,999" },
  { name: "2 Piece Lawn Suit-Printed (Summer)", img: placeholder, price: "Rs. 7,299" },
];


export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  
  const navigate = useNavigate();
  const { addToWishlist, addToCart } = useContext(ShopContext);

  // Helper to add to wishlist and go to wishlist page
  function handleAddToWishlist(item) {
    addToWishlist({
      id: item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      name: item.name,
      price: item.price ? parseInt(item.price.replace(/\D/g, '')) : 5999,
      img: item.img,
      quantity: 1
    });
    navigate('/wishlist');
  }
  // Helper to add to cart and go to cart page
  function handleAddToCart(item) {
    addToCart({
      id: item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      name: item.name,
      price: item.price ? parseInt(item.price.replace(/\D/g, '')) : 5999,
      img: item.img,
      quantity: 1
    });
    navigate('/cart');
  }

  return (
    <>
      {showWelcome && <WelcomePrompt onFinish={() => setShowWelcome(false)} />}
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 flex flex-col animate-gradient-x overflow-x-hidden">
      {/* Background animation */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 10s ease-in-out infinite;
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          opacity: 1 !important;
          animation: fade-in-up 1s cubic-bezier(0.4,0,0.2,1) both;
        }
        .delay-100 { animation-delay: 0.2s; }
        .delay-200 { animation-delay: 0.4s; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
          50% { transform: translateY(-18px); }
          70% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.2s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
      {/* Carousel */}
      <Carousel images={carouselImages} />

      {/* Category Circles */}
      <div className="w-full max-w-6xl mx-auto flex flex-row items-stretch mt-10">
        <div className="flex-1">
          {/* Category Circles */}
          {categories.map((cat, idx) => (
            <section key={cat.label} className="w-full mx-auto opacity-0 animate-fade-in-up">
              <h2 className={["Dubata","Niqab","Hijab","Abaya"].includes(cat.label) ? "text-5xl md:text-6xl font-extrabold text-center mb-8 tracking-wider" : "text-3xl md:text-4xl font-bold text-center mb-6 tracking-wider text-pink-700 uppercase"} style={["Dubata","Niqab","Hijab","Abaya"].includes(cat.label) ? { color: '#e11d48', textShadow: '2px 2px 10px #fff, 0 4px 24px #eab1c8' } : {}}>{cat.label}</h2>
              <div className="flex flex-wrap justify-center gap-6">
                {cat.items.map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="relative group flex flex-col items-center">
                      <button
                        className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-2 text-pink-600 hover:bg-pink-100 hover:text-pink-700 transition"
                        title="Add to Wishlist"
                        onClick={e => { e.stopPropagation(); handleAddToWishlist(item); }}
                      >
                        <FaHeart size={20} />
                      </button>
                      <div
                        className="flex flex-col items-center cursor-pointer group"
                        onClick={() => navigate(`/product/${item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`)}
                      >
                        <img src={item.img} alt={item.name} className="w-44 h-44 md:w-72 md:h-72 object-cover rounded-full border-4 border-pink-200 shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:animate-bounce-slow" />
                        <span className="mt-5 text-xl md:text-3xl font-extrabold text-gray-900 uppercase tracking-widest transition-colors duration-300 group-hover:text-pink-700 group-hover:animate-pulse">{item.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Head Caps & Tops Carousel */}
      <section className="w-full max-w-6xl mx-auto mt-10 opacity-0 animate-fade-in-up delay-100">
        <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-8 tracking-wider" style={{ color: '#e11d48', textShadow: '2px 2px 10px #fff, 0 4px 24px #eab1c8' }}>Head Caps & Tops</h2>
        <HorizontalCarousel
          items={headCapsTops}
          onCartClick={handleAddToCart}
          onWishlistClick={handleAddToWishlist}
        />
      </section>

      {/* New Arrivals */}
      <section className="w-full max-w-7xl mx-auto mt-10 px-2 md:px-0 opacity-0 animate-fade-in-up delay-200">
        <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-8 tracking-wider" style={{ color: '#e11d48', textShadow: '2px 2px 10px #fff, 0 4px 24px #eab1c8' }}>New Arrivals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 md:gap-10">
          {newArrivals.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-200 min-h-[350px] group transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:z-10 relative animate-fade-in-up"
            >
              {/* Floating Icons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                <button
                  className="bg-white/80 rounded-full p-2 text-pink-600 hover:bg-pink-100 hover:text-pink-700 transition"
                  title="Add to Wishlist"
                  onClick={e => { e.stopPropagation(); handleAddToWishlist(item); }}
                >
                  <FaHeart size={20} />
                </button>
              </div>
              <div
                className="w-full aspect-[4/5] bg-gray-100 overflow-hidden flex items-center justify-center cursor-pointer"
                onClick={() => navigate(`/product/${item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`)}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 group-hover:animate-bounce-slow"
                  draggable="false"
                />
              </div>
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div className="font-semibold text-gray-900 text-base md:text-lg text-center line-clamp-2 leading-tight">{item.name}</div>
                <div className="text-pink-700 font-extrabold text-lg md:text-xl text-center mt-1">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
        {/* Social, Payment, Instagram - 3 columns */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pb-4 items-start">
          {/* Social Icons */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex gap-4 text-2xl mb-2">
              <button type="button" className="text-blue-600" aria-label="Facebook"><i className="fab fa-facebook-square"></i></button>
              <button type="button" className="text-red-600" aria-label="YouTube"><i className="fab fa-youtube"></i></button>
            </div>
          </div>
          {/* Payment */}
          <div className="flex flex-col items-center">
            <div className="font-semibold text-base mb-1">We Accept</div>
            <div className="flex gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-6" />
            </div>
          </div>
          {/* Instagram Icon */}
          <div className="flex flex-col items-center md:items-end md:mt-[-160px] md:mr-96 md:ml-64">
            <div className="flex flex-row items-end gap-8 mb-2">
              <a href="https://www.instagram.com/hijab_e_zehraa_?igsh=NGdjcW03eTQ4Y2p0" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-pink-600 hover:text-pink-800 transition-colors" style={{fontSize: '120px'}}>
                <FaInstagram />
              </a>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-[#25D366] hover:text-green-700 transition-colors" style={{fontSize: '120px'}}>
                <FaWhatsapp />
              </a>
            </div>
            <div className="flex flex-row items-start gap-8">
              <div className="text-pink-700 font-semibold text-lg text-center w-[120px]">Follow us on Instagram</div>
              <div className="text-green-700 font-semibold text-lg text-center w-[120px]">Contact us on WhatsApp</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-6 pb-2">
          <span className="px-6 py-3 rounded-2xl font-extrabold text-2xl md:text-3xl bg-gradient-to-r from-pink-400 via-pink-600 to-purple-500 text-white shadow-lg tracking-widest" style={{letterSpacing:'3px', boxShadow:'0 4px 24px 0 rgba(236,72,153,0.18)'}}>
            P-81 BATALA COLONY FAISALABAD, PAKISTAN
          </span>
        </div>
      </footer>
    </div>
  </>
  );
}
