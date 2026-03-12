import { useState, useRef } from "react";

const ImageGallery = ({ images }) => {
  const fallback =
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800";

  const safeImages =
    images && images.length > 0 ? images : [fallback];

  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % safeImages.length);
  };

  const prevSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + safeImages.length) % safeImages.length
    );
  };

  // Swipe Handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - endX;

    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  };

  return (
    <div className="relative mb-6">

      {/* ================= MOBILE SLIDER ================= */}
      <div
        className="md:hidden relative overflow-hidden rounded-2xl h-[300px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {safeImages.map((img, index) => (
            <img
              key={index}
              src={img || fallback}
              alt={`Slide ${index}`}
              className="w-full flex-shrink-0 object-cover"
              onError={(e) => (e.target.src = fallback)}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow"
        >
          ❮
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow"
        >
          ❯
        </button>
      </div>

      {/* ================= DESKTOP GRID ================= */}
      <div className="hidden md:grid grid-cols-2 gap-1 rounded-2xl overflow-hidden h-[460px]">
        
        {/* Main large image */}
        <div className="row-span-2">
          <img
            src={safeImages[0]}
            alt="Main view"
            className="w-full h-full object-cover hover:brightness-95 transition"
            onError={(e) => (e.target.src = fallback)}
          />
        </div>

        {[1, 2, 3].map((idx) => (
          <div key={idx} className="relative overflow-hidden">
            <img
              src={safeImages[idx] || safeImages[0]}
              alt={`View ${idx}`}
              className="w-full h-full object-cover hover:brightness-95 transition"
              onError={(e) => (e.target.src = fallback)}
            />
          </div>
        ))}
      </div>

      {/* Show all photos button (desktop only like VRBO) */}
      <button className="hidden md:flex absolute bottom-4 right-4 bg-white border border-gray-800 rounded-lg px-4 py-2 text-sm font-bold items-center gap-2 hover:bg-gray-50 shadow-sm transition">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
        Show all photos
      </button>
    </div>
  );
};

export default ImageGallery;