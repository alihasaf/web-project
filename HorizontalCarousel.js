import React, { useRef } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

export default function HorizontalCarousel({ items, onItemClick = undefined, onWishlistClick = undefined, onCartClick = undefined }) {
  const scrollRef = useRef();

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 p-3 md:p-4 rounded-full shadow-lg flex items-center justify-center text-2xl text-gray-700 hover:bg-pink-100 transition-all"
        style={{ left: '-32px' }}
        aria-label="Scroll left"
      >
        <span className="material-icons" style={{ fontSize: 28 }}>&#8592;</span>
      </button>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-none"
        style={{ scrollBehavior: "smooth", msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        /* Hide scrollbar for all browsers */
        onWheel={e => { if (e.deltaY !== 0) { e.currentTarget.scrollLeft += e.deltaY; } }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-28 h-28 md:w-40 md:h-40 bg-white rounded-lg shadow p-2 flex flex-col items-center mr-2 cursor-pointer group"
            onClick={() => onItemClick && onItemClick(item)}
            title={item.name}
          >
            {/* Add to Cart button */}
            {onCartClick && (
              <button
                className="absolute top-2 left-2 z-10 bg-white/80 rounded-full p-2 text-pink-600 hover:bg-pink-100 hover:text-pink-700 transition"
                title="Add to Cart"
                onClick={e => { e.stopPropagation(); onCartClick(item); }}
              >
                <FaShoppingCart size={18} />
              </button>
            )}
            {/* Add to Wishlist button */}
            {onWishlistClick && (
              <button
                className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-2 text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700 transition"
                title="Add to Wishlist"
                onClick={e => { e.stopPropagation(); onWishlistClick(item); }}
              >
                <FaHeart size={18} />
              </button>
            )}
            <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-md" />
            <span className="mt-2 text-xs md:text-base font-bold text-gray-700 text-center">{item.name}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 p-3 md:p-4 rounded-full shadow-lg flex items-center justify-center text-2xl text-gray-700 hover:bg-pink-100 transition-all"
        style={{ right: '-32px' }}
        aria-label="Scroll right"
      >
        <span className="material-icons" style={{ fontSize: 28 }}>&#8594;</span>
      </button>
    </div>
  );
}
