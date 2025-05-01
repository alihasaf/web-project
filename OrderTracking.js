import React from "react";

export default function OrderTracking() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 flex flex-col items-center justify-center px-4 py-16">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4 text-center">Order Tracking</h1>
        <p className="text-gray-800 text-lg mb-6 text-justify">
          Track your order status by entering your order number on our tracking page. You will receive real-time updates about your shipment, including dispatch, transit, and delivery. If you need help, please contact our customer care team.
        </p>
      </div>
    </div>
  );
}
