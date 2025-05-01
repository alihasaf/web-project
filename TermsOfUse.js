import React from "react";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 flex flex-col items-center justify-center px-4 py-16">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-extrabold text-pink-700 mb-6 text-center tracking-wide uppercase">Terms & Conditions</h1>
        <ul className="list-inside list-disc space-y-5 text-gray-800 text-base md:text-lg">
          <li className="flex items-start gap-2"><span className="text-pink-600 mt-1">&#10003;</span><span><strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account and password and for restricting access to your device.</span></li>
          <li className="flex items-start gap-2"><span className="text-pink-600 mt-1">&#10003;</span><span><strong>Order Acceptance:</strong> All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order at our discretion.</span></li>
          <li className="flex items-start gap-2"><span className="text-pink-600 mt-1">&#10003;</span><span><strong>Product Information:</strong> We strive for accuracy, but product images and descriptions are for illustrative purposes only. Actual colors and details may vary.</span></li>
          <li className="flex items-start gap-2"><span className="text-pink-600 mt-1">&#10003;</span><span><strong>Pricing Policy:</strong> Prices are subject to change without notice. The price at checkout is final and binding.</span></li>
          <li className="flex items-start gap-2"><span className="text-pink-600 mt-1">&#10003;</span><span><strong>Payment Security:</strong> All payments are processed securely. We do not store your credit/debit card details.</span></li>
          <li className="flex items-start gap-2"><span className="text-pink-600 mt-1">&#10003;</span><span><strong>Shipping & Delivery:</strong> Delivery times are estimates and may vary due to circumstances beyond our control.</span></li>
          <li className="flex items-start gap-2"><span className="text-pink-600 mt-1">&#10003;</span><span><strong>Returns & Exchanges:</strong> Items can be exchanged within 7 days if unused and in original packaging. See our Exchange Policy for details.</span></li>
          <li className="flex items-start gap-2"><span className="text-pink-600 mt-1">&#10003;</span><span><strong>Intellectual Property:</strong> All content, images, and designs are the property of Hijabe Zehraa and may not be used without permission.</span></li>
          <li className="flex items-start gap-2"><span className="text-pink-600 mt-1">&#10003;</span><span><strong>Privacy Commitment:</strong> Your personal data is protected and handled according to our Privacy Policy.</span></li>
          <li className="flex items-start gap-2"><span className="text-pink-600 mt-1">&#10003;</span><span><strong>Right to Amend:</strong> We reserve the right to update these terms at any time. Continued use of our website means you accept these changes.</span></li>
        </ul>
      </div>
    </div>
  );
}
