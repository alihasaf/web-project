import React from "react";

export default function FAQs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 flex flex-col items-center justify-center px-4 py-16">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4 text-center">FAQ'S</h1>
        <p className="text-gray-800 text-lg mb-6 text-justify">
          Have questions? Find answers to the most common queries about our products, shipping, returns, and more. If your question is not listed, please contact our customer care team for assistance.
        </p>
      </div>
    </div>
  );
}
