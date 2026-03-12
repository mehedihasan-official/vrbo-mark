import React from 'react';
import ListPropertyBG from "../../../assets/images/list-property.avif"

const ListProperty = () => {
    return (
        <div className="w-full">
              
              {/* Desktop Layout */}
              <div
                className="hidden md:flex relative w-full min-h-[500px] bg-cover bg-center bg-no-repeat items-center"
                style={{
                  backgroundImage: `url(${ListPropertyBG})`,
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30"></div>
        
                {/* Left Content */}
                <div className="relative z-10 bg-white dark:bg-gray-800 p-10 ml-16 max-w-xl rounded-lg shadow-lg">
                  <h1 className="text-4xl font-semibold mb-4 text-gray-800 dark:text-white text-left">
                    Rent your property confidently with Vrbo
                  </h1>
        
                  <p className="mb-6 text-lg text-gray-600 dark:text-gray-300 text-left">
                   With live-support, quick signup, and highly-rated guests, hosting on Vrbo can feel like a vacation.
                  </p>
        
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
                    List your property
                  </button>
                </div>
              </div>
        
              {/* Mobile Layout */}
              <div className="md:hidden flex flex-col m-4  border border-gray-300 dark:border-gray-600 rounded-4xl">
                
                {/* Content Top */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-4xl ">
                  <h1 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
                    Early booking deals: Save over $120
                  </h1>
        
                  <p className="mb-4 text-gray-600 dark:text-gray-200">
                    Save big when you book early. Average savings $141. Select homes only.*
                  </p>
        
                  <button className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-lg font-semibold">
                    Book Now
                  </button>
                </div>
        
                {/* Background Image Below */}
                <div
                  className="w-full h-[300px] bg-cover bg-center rounded-b-4xl bg-no-repeat"
                  style={{
                    backgroundImage: `url(${ListPropertyBG})`,
                  }}
                ></div>
              </div>
            </div>
    );
};

export default ListProperty;