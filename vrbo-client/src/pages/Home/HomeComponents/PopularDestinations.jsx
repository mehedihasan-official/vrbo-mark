import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import destinations from "../../../../public/database/destinations.json"

const PopularDestinations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);


  // Sample destinations - replace with your actual data
  // const destinations = [
  //   {
  //     id: 1,
  //     name: "3 Bedrooms apartment @ Iqbal Road",
  //     location: "Mohammadpur, Dhaka, Bangladesh",
  //     city: "Dhaka",
  //     flag: "🇧🇩",
  //     image: "https://images.trvl-media.com/place/8392/c5d09a27-bad5-47b3-a576-d978d338c3d4.jpg?impolicy=fcrop&w=469&h=201&p=1&q=medium",
  //     rating: 10.0,
  //     ratingText: "Exceptional",
  //     reviews: 2,
  //     price: 79,
  //     nights: 2,
  //   },
  //   {
  //     id: 2,
  //     name: "Luxury Beach Villa",
  //     location: "Cox's Bazar, Chittagong, Bangladesh",
  //     city: "Cox's Bazar",
  //     flag: "🇧🇩",
  //     image: "https://images.trvl-media.com/place/6058849/45e3d730-1574-4221-a359-cb14e360f3fd.jpg?impolicy=fcrop&w=469&h=201&p=1&q=medium",
  //     rating: 9.8,
  //     ratingText: "Exceptional",
  //     reviews: 15,
  //     price: 120,
  //     nights: 2,
  //   },
  //   {
  //     id: 3,
  //     name: "Mountain View Cottage",
  //     location: "Bandarban, Chittagong Hill Tracts, Bangladesh",
  //     city: "Bandarban",
  //     flag: "🇧🇩",
  //     image: "https://images.trvl-media.com/place/6296770/59fb5d73-891a-440d-940d-a4ba6f65e4f5.jpg?impolicy=fcrop&w=469&h=201&p=1&q=medium",
  //     rating: 9.6,
  //     ratingText: "Wonderful",
  //     reviews: 8,
  //     price: 95,
  //     nights: 2,
  //   },
  //   {
  //     id: 4,
  //     name: "Modern City Apartment",
  //     location: "Gulshan, Dhaka, Bangladesh",
  //     city: "Dhaka",
  //     flag: "🇧🇩",
  //     image: "https://images.trvl-media.com/place/183806/26daabff-4166-44bd-b9f8-cad90c07c4bf.jpg?impolicy=fcrop&w=469&h=201&p=1&q=medium",
  //     rating: 9.4,
  //     ratingText: "Wonderful",
  //     reviews: 12,
  //     price: 110,
  //     nights: 2,
  //   },
  //   {
  //     id: 5,
  //     name: "Riverside Resort",
  //     location: "Sylhet, Sylhet Division, Bangladesh",
  //     city: "Sylhet",
  //     flag: "🇧🇩",
  //     image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=500&q=80",
  //     rating: 9.2,
  //     ratingText: "Wonderful",
  //     reviews: 20,
  //     price: 85,
  //     nights: 2,
  //   },
  //   {
  //     id: 6,
  //     name: "Heritage House",
  //     location: "Old Dhaka, Dhaka, Bangladesh",
  //     city: "Dhaka",
  //     flag: "🇧🇩",
  //     image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=500&q=80",
  //     rating: 9.0,
  //     ratingText: "Excellent",
  //     reviews: 6,
  //     price: 65,
  //     nights: 2,
  //   },
  // ];

  // Update items per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2); // Tablet
      } else {
        setItemsPerView(4); // Desktop
      }
      setCurrentIndex(0); // Reset to first slide on resize
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, destinations.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < maxIndex) {
      handleNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      handlePrev();
    }

    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="py-12 md:py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">

        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold 
          text-gray-900 dark:text-white mb-8">
          Popular destinations
        </h2>

        <div className="relative">

          {/* Desktop Nav Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 
              bg-white dark:bg-gray-800 
              rounded-full p-3 shadow-lg 
              hover:bg-gray-50 dark:hover:bg-gray-700 
              transition-all"
            >
              <FaChevronLeft className="text-xl text-gray-700 dark:text-gray-200" />
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={handleNext}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 
              bg-white dark:bg-gray-800 
              rounded-full p-3 shadow-lg 
              hover:bg-gray-50 dark:hover:bg-gray-700 
              transition-all"
            >
              <FaChevronRight className="text-xl text-gray-700 dark:text-gray-200" />
            </button>
          )}

          {/* Cards Container */}
          <div
            className="overflow-hidden touch-pan-y"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                gap: itemsPerView === 1 ? "0px" : "16px",
              }}
            >
              {destinations.map((destination) => (
                <div
                  key={destination.id}
                  className="flex-shrink-0 px-1 md:px-0"
                  style={{
                    width:
                      itemsPerView === 1
                        ? "100%"
                        : `calc(${100 / itemsPerView}% - 12px)`,
                  }}
                >
                  <div className="bg-white dark:bg-gray-800 
                    rounded-xl overflow-hidden 
                    hover:shadow-xl transition-shadow duration-300 
                    cursor-pointer group h-full">

                    {/* Image */}
                    <div className="relative overflow-hidden h-48 md:h-52">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover 
                        group-hover:scale-110 transition-transform 
                        rounded-3xl duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4">

                      <p className="text-base font-semibold 
                        text-gray-800 dark:text-gray-100 line-clamp-2">
                        <span className="mr-1">{destination.flag}</span>
                        {destination.name} @ {destination.location}
                      </p>

                      <h3 className="text-sm 
                        text-gray-600 dark:text-gray-400 mb-3">
                        {destination.city}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-[#127d3b] text-white px-2 py-1 rounded text-xs font-semibold">
                          {destination.rating}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ({destination.reviews} reviews)
                        </span>
                      </div>

                      {/* Price */}
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          ${destination.price}
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ${destination.price * destination.nights} for {destination.nights} nights
                        </p>
                        <p className="text-xs text-[#127d3b] mt-1">
                          All fees included
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: destinations.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(Math.min(index, maxIndex))}
              className={`h-2 rounded-full transition-all duration-300 ${
                index >= currentIndex && index < currentIndex + itemsPerView
                  ? "bg-blue-600 w-8"
                  : "bg-gray-300 dark:bg-gray-600 w-2 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDestinations;