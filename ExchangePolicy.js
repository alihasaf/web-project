import React from "react";

export default function ExchangePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 flex flex-col items-center justify-center px-4 py-16">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4 text-center">Exchange Policy</h1>
        <p className="text-gray-800 text-lg mb-6 text-justify">
          If you are not satisfied with your purchase, you may exchange your item within 7 days of delivery. The product must be unused, in original packaging, and accompanied by a receipt. Please contact our customer care to initiate an exchange request.
        </p>
      </div>
    </div>
  );
}
