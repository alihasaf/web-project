import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 flex flex-col items-center justify-center px-4 py-16">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4 text-center">About Hijabe Zehraa</h1>
        <p className="text-gray-800 text-lg mb-6 text-justify">
          Welcome to Hijabe Zehraa, your trusted destination for elegant, comfortable, and high-quality hijabs, abayas, and accessories. Our journey began with a passion for modest fashion and a mission to empower women to express their unique style with confidence and grace. Every piece in our collection is thoughtfully curated, blending tradition with modern trends, so you can embrace your identity and feel beautiful every day. We believe in the power of community, authenticity, and customer care—our team is always here to support you, whether you are shopping for daily wear or a special occasion. Thank you for choosing Hijabe Zehraa and being a part of our story under the soft, graceful folds of every hijab we offer.
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
