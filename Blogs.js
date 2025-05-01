import React from "react";

export default function Blogs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 flex flex-col items-center justify-center px-4 py-16">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4 text-center">Blogs</h1>
        <p className="text-gray-800 text-lg mb-6 text-justify">
          Explore our latest blogs on modest fashion, styling tips, hijab tutorials, and stories from the Hijabe Zehraa community. Stay inspired and connected with us for new updates every week!
        </p>
      </div>
    </div>
  );
}
