import React from "react";
import EarlyBookingImage from "../../../assets/images/earliyBookings-bg-img.jpg";

const EarlyBooking = () => {
  return (
    <div className="w-full">
      
      {/* Desktop Layout */}
      <div
        className="hidden md:flex relative w-full min-h-[500px] 
                   bg-cover bg-center bg-no-repeat items-center"
        style={{
          backgroundImage: `url(${EarlyBookingImage})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50 transition-colors duration-300"></div>

        {/* Left Content */}
        <div className="relative z-10 
                        bg-white dark:bg-gray-800 
                        p-10 ml-16 max-w-xl rounded-lg 
                        shadow-lg dark:shadow-none 
                        transition-colors duration-300">
          <h1 className="text-4xl font-semibold mb-4 
                         text-gray-800 dark:text-white text-left">
            Early booking deals: Save over $120
          </h1>

          <p className="mb-6 text-lg 
                        text-gray-600 dark:text-gray-300 text-left">
            Save big when you book early. Average savings $141. Select homes only.*
          </p>

          <button className="bg-black dark:bg-white 
                             text-white dark:text-black 
                             px-6 py-3 rounded-lg font-semibold 
                             hover:bg-gray-800 dark:hover:bg-gray-200 
                             transition">
            Book Now
          </button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col m-4 
                      border border-gray-300 dark:border-gray-700 
                      rounded-4xl overflow-hidden 
                      transition-colors duration-300">
        
        {/* Content Top */}
        <div className="bg-white dark:bg-gray-800 
                        p-6 rounded-t-4xl 
                        transition-colors duration-300">
          <h1 className="text-2xl font-semibold mb-3 
                         text-gray-800 dark:text-white">
            Early booking deals: Save over $120
          </h1>

          <p className="mb-4 
                        text-gray-600 dark:text-gray-300">
            Save big when you book early. Average savings $141. Select homes only.*
          </p>

          <button className="bg-black dark:bg-white 
                             text-white dark:text-black 
                             px-5 py-2 rounded-lg font-semibold 
                             hover:bg-gray-800 dark:hover:bg-gray-200 
                             transition">
            Book Now
          </button>
        </div>

        {/* Background Image Below */}
        <div
          className="w-full h-[300px] bg-cover bg-center 
                     rounded-b-4xl bg-no-repeat"
          style={{
            backgroundImage: `url(${EarlyBookingImage})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default EarlyBooking;