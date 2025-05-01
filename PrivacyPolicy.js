import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 flex flex-col items-center justify-center px-4 py-16">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4 text-center">Privacy Policy</h1>
        <p className="text-gray-800 text-lg mb-6 text-justify">
          Your privacy is important to us. All personal information is kept confidential and used only for order processing and customer service. We do not share your data with third parties. For more details, please read our full privacy policy.
        </p>
      </div>
    </div>
  );
}
