import React from "react";
import { createPortal } from "react-dom";
import ChatbotWidget from "./components/ChatbotWidget";
import { HashRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminPrivateRoute from "./pages/admin/AdminPrivateRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import OrderTracking from "./pages/OrderTracking";
import ShippingHandling from "./pages/ShippingHandling";
import ExchangePolicy from "./pages/ExchangePolicy";
import OrderCancellationPolicy from "./pages/OrderCancellationPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import FAQs from "./pages/FAQs";
import ContactUs from "./pages/ContactUs";
import Careers from "./pages/Careers";
import StoreLocator from "./pages/StoreLocator";
import Blogs from "./pages/Blogs";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import CheckoutWithStripe from "./pages/Checkout";
import Dubata from "./pages/Dubata";
import Hijab from "./pages/Hijab";
import Niqab from "./pages/Niqab";
import Abaya from "./pages/Abaya";
import ProductDetail from "./pages/ProductDetail";
import AbayaProductDetail from "./pages/AbayaProductDetail";
import HijabProductDetail from "./pages/HijabProductDetail";
import NiqabProductDetail from "./pages/NiqabProductDetail";
import DubataProductDetail from "./pages/DubataProductDetail";
import Mission from "./pages/Mission";
import { ShopProvider } from "./shopContext";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

const navLinks = [
  { name: "HOME", path: "/" },
  { name: "ABOUT", path: "/about" },
  { name: "DUBATA", path: "/dubata" },
  { name: "HIJAB", path: "/hijab" },
  { name: "NIQAB", path: "/niqab" },
  { name: "ABAYA", path: "/abaya" },
  { name: "CONTACT US", path: "/contact-us" },
];


// Old Home removed. Using new Home.js component.

function NavLinks() {
  const location = useLocation();
  return (
    <div className="hidden md:flex gap-6">
      {navLinks.map(link => {
        const isActive =
          link.path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(link.path);
        return (
          <Link
            key={link.name}
            to={link.path}
            className={
              "font-semibold transition-colors px-1 " +
              (isActive
                ? "text-pink-700 underline underline-offset-8 font-bold"
                : "text-gray-700 hover:text-pink-600")
            }
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}

function App() {
  const isLoggedIn = false;
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  // Drawer portal root for mobile nav
  const drawerRoot = typeof window !== "undefined" ? document.body : null;
  return (
    <ShopProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-pink-300">
        <nav className="w-full bg-white/80 backdrop-blur shadow-md sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-20">
          {/* Brand */}
          <Link to="/mission" className="font-extrabold text-2xl tracking-widest text-pink-600 select-none hover:text-pink-800 focus:outline-none">
            HIJABE ZEHRAA
          </Link>
          {/* Nav links */}
          <NavLinks />
          {/* Cart & Wishlist */}
          <div className="flex gap-4 items-center">
            <Link to="/cart" className="text-pink-700 hover:text-pink-900 transition-colors text-2xl" title="Cart"><FaShoppingCart /></Link>
            <Link to="/wishlist" className="text-yellow-700 hover:text-yellow-900 transition-colors text-2xl" title="Wishlist"><FaHeart /></Link>
            {!isLoggedIn && (
              <>
                <Link to="/login" className="font-semibold text-gray-700 hover:text-pink-600 transition-colors">LOGIN</Link>
                <Link to="/signup" className="font-semibold text-gray-700 hover:text-pink-600 transition-colors">SIGNUP</Link>
              </>
            )}
            {isLoggedIn && (
              <a href="#dashboard" className="font-semibold text-white bg-pink-500 px-4 py-2 rounded-lg shadow hover:bg-pink-600 transition-all">DASHBOARD</a>
            )}
          </div>
          {/* Hamburger for mobile */}
          <button className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded focus:outline-none border border-pink-300 bg-white ml-2" onClick={() => setDrawerOpen(true)}>
            <span className="block w-6 h-0.5 bg-pink-600 mb-1"></span>
            <span className="block w-6 h-0.5 bg-pink-600 mb-1"></span>
            <span className="block w-6 h-0.5 bg-pink-600"></span>
          </button>
          </div>
          {/* Mobile Drawer */}
          {drawerOpen && drawerRoot && createPortal(
            <>
              <div
                className="fixed inset-0 bg-black/40 z-30"
                style={{ pointerEvents: drawerOpen ? 'auto' : 'none' }}
                onClick={() => setDrawerOpen(false)}
                aria-modal="true"
                role="presentation"
              ></div>
              <aside
                className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col animate-slide-in overflow-y-auto"
                aria-modal="true"
                role="dialog"
                tabIndex={-1}
                style={{ transition: 'transform 0.3s cubic-bezier(.4,0,.2,1)', transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)' }}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-pink-100">
                  <span className="font-extrabold text-2xl tracking-widest text-pink-600 select-none">HIJABE ZEHRAA</span>
                  <button className="text-pink-600 text-3xl font-bold" onClick={() => setDrawerOpen(false)}>&times;</button>
                </div>
                <div className="flex flex-col gap-3 px-6 py-4">
                  {navLinks.map(link => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="font-semibold text-gray-700 hover:text-pink-600 transition-colors text-lg"
                      onClick={() => setDrawerOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  {!isLoggedIn && (
                    <>
                      <Link to="/login" className="font-semibold text-gray-700 hover:text-pink-600 transition-colors text-lg" onClick={() => setDrawerOpen(false)}>LOGIN</Link>
                      <Link to="/signup" className="font-semibold text-gray-700 hover:text-pink-600 transition-colors text-lg" onClick={() => setDrawerOpen(false)}>SIGNUP</Link>
                    </>
                  )}
                  {isLoggedIn && (
                    <Link to="/dashboard" className="font-semibold text-white bg-pink-500 px-4 py-2 rounded-lg shadow hover:bg-pink-600 transition-all" onClick={() => setDrawerOpen(false)}>DASHBOARD</Link>
                  )}
                </div>
              </aside>
            </>,
            drawerRoot
          )}

        </nav>
        {/* Main content with routes */}
        <Routes>
          {/* Admin Panel Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/shipping-handling" element={<ShippingHandling />} />
          <Route path="/exchange-policy" element={<ExchangePolicy />} />
          <Route path="/order-cancellation-policy" element={<OrderCancellationPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/store-locator" element={<StoreLocator />} />
          <Route path="/blogs" element={<Blogs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/store-locator" element={<StoreLocator />} />
        <Route path="/blogs" element={<Blogs />} />
          <Route path="/dubata" element={<Dubata />} />
          <Route path="/hijab" element={<Hijab />} />
          <Route path="/niqab" element={<Niqab />} />
          <Route path="/abaya" element={<Abaya />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
<Route path="/abaya/:slug" element={<AbayaProductDetail />} />
<Route path="/hijab/:slug" element={<HijabProductDetail />} />
<Route path="/niqab/:slug" element={<NiqabProductDetail />} />
<Route path="/dubata/:slug" element={<DubataProductDetail />} />
<Route path="/checkout" element={<CheckoutWithStripe />} />
<Route path="/mission" element={<Mission />} />
        </Routes>
      </div>
    </Router>
    <ChatbotWidget />
  </ShopProvider>
  );
}

export default App;
