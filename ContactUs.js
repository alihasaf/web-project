import React from "react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 flex flex-col items-center justify-center px-4 py-16">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4 text-center">Contact Us</h1>
        <p className="text-gray-800 text-lg mb-6 text-justify">
          Have a question, suggestion, or need support? Our team is here to help! Reach out to us via phone or email and we will get back to you as soon as possible. We value your feedback and strive to provide the best service for our customers.
        </p>
        <div className="mt-8">
          <h2 className="text-xl font-bold text-pink-600 mb-2">Contact Numbers</h2>
          <ul className="text-base md:text-lg text-gray-900 space-y-1">
            <li><span className="font-bold">MEERAB</span>: +923061355767</li>
            <li><span className="font-bold">ALIHA</span>: +923069888603</li>
            <li><span className="font-bold">HUMAIRA</span>: +923247078080</li>
            <li><span className="font-bold">SAFDAR</span>: +923034546767</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
