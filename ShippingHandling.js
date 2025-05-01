import React from "react";

export default function ShippingHandling() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 flex flex-col items-center justify-center px-4 py-16">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4 text-center">Shipping & Handling</h1>
        <p className="text-gray-800 text-lg mb-6 text-justify">
          We offer safe and reliable shipping across Pakistan. Orders are processed within 2-3 business days and delivered to your doorstep via trusted courier partners. Shipping charges are calculated at checkout. For any queries, please contact our support team.
        </p>
      </div>
    </div>
  );
}
