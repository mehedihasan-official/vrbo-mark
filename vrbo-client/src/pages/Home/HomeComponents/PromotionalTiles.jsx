import React, { useRef, useState } from "react";

const PromotionalTiles = () => {
  const tiles = [
    {
      id: 1,
      title: "The mountains are calling",
      description:
        "From weekly rates and last-minute steals—find the best value for your ski season stay.",
      image:
        "https://a.travel-assets.com/travel-assets-manager/fb190dff-3b43-4eb5-a1a8-7e06410762ca/VRBO-TILE-SKI.jpg?impolicy=fcrop&w=400&h=400&q=high&p=1",
      buttonText: "Book now",
      link: "/travel/ski",
    },
    {
      id: 2,
      title: "Top properties for spring",
      description:
        "Will it be pool fun, lazy beach days, waterfront chill, or countryside adventure?",
      image:
        "https://a.travel-assets.com/travel-assets-manager/04-12-25/800x800_Img1V2.jpg?impolicy=fcrop&w=400&h=400&q=high&p=1",
      buttonText: "See homes",
      link: "/travel/spring",
    },
    {
      id: 3,
      title: "Stay together, cheer together",
      description:
        "Explore top vacation rentals in North America's soccer capitals",
      image:
        "https://forever.travel-assets.com/flex/flexmanager/mediaasset/1391393-0_2-Stadium.jpg?impolicy=fcrop&w=400&h=400&q=high&p=1",
      buttonText: "Book now",
      link: "/travel/soccer",
    },
  ];

  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index) => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.offsetWidth;
    sliderRef.current.scrollTo({
      left: width * index,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < tiles.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  return (
    <div className="py-12 md:py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">

        {/* ✅ Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden 
                         shadow-lg dark:shadow-none 
                         hover:shadow-2xl dark:hover:shadow-xl 
                         transition-all duration-300 cursor-pointer group"
            >
              <div className="relative overflow-hidden h-64 md:h-80">
                <img
                  src={tile.image}
                  alt={tile.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {tile.title}
                </h3>

                <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
                  {tile.description}
                </p>

                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 
                                   dark:bg-blue-500 dark:hover:bg-blue-600 
                                   text-white font-semibold rounded-lg 
                                   transition-colors duration-200">
                  {tile.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Mobile Slider */}
        <div className="relative md:hidden">

          {/* Arrow Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
                       bg-white dark:bg-gray-800 
                       text-gray-900 dark:text-white
                       shadow-md dark:shadow-none
                       rounded-full p-2 transition"
          >
            ←
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
                       bg-white dark:bg-gray-800 
                       text-gray-900 dark:text-white
                       shadow-md dark:shadow-none
                       rounded-full p-2 transition"
          >
            →
          </button>

          {/* Swipe Container */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
          >
            {tiles.map((tile) => (
              <div key={tile.id} className="min-w-full snap-start px-2">
                <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden transition-colors duration-300">
                  
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={tile.image}
                      alt={tile.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {tile.title}
                    </h3>

                    <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
                      {tile.description}
                    </p>

                    <button className="px-6 py-2 
                                       text-blue-700 dark:text-blue-400 
                                       border border-gray-800 dark:border-gray-600 
                                       font-semibold rounded-full 
                                       hover:bg-gray-200 dark:hover:bg-gray-700 
                                       transition">
                      {tile.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PromotionalTiles;