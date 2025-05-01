import React, { useState, useEffect, useRef } from "react";

export default function Carousel({ images, interval = 3000 }) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
    timeoutRef.current = setTimeout(nextSlide, interval);
    return () => clearTimeout(timeoutRef.current);
  }, [current, images.length, interval]);

  const goTo = (idx) => {
    setCurrent(idx);
  };
  const prev = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev + 1) % images.length);

  return (
    <div className="w-full max-w-8xl mx-auto mt-8 rounded-3xl overflow-hidden shadow-2xl relative">
      <div className="relative w-full h-80 md:h-[38rem] bg-gray-200 flex items-center justify-center">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={"carousel-" + idx}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            style={{ pointerEvents: idx === current ? "auto" : "none" }}
          />
        ))}
        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full cursor-pointer text-2xl font-bold z-20">&#8592;</button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full cursor-pointer text-2xl font-bold z-20">&#8594;</button>
        <div className="absolute bottom-8 left-8 text-4xl md:text-7xl font-extrabold text-white drop-shadow-2xl tracking-wide">SIGNATURE PRET</div>
        <div className="absolute bottom-2 right-6 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === current ? "bg-pink-600" : "bg-white border border-pink-600"}`}
              onClick={() => goTo(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
