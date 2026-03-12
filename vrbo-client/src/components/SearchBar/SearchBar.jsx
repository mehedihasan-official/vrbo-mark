import React, { useState } from 'react';
import { FaCheck, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { MdDateRange } from 'react-icons/md';

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div>
            <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-xl max-w-6xl mx-auto mb-6 md:mb-8">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 md:gap-4">
          {/* Location Input */}
          <div className="flex items-center w-full lg:w-auto lg:flex-1 border border-gray-500 rounded-lg p-3 bg-gray-50 dark:bg-gray-700 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
            <FaMapMarkerAlt className="text-gray-700 dark:text-gray-300 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Where to?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent outline-none text-sm dark:text-gray-300 md:text-base"
            />
          </div>

          {/* Check-in & Check-out Inputs */}
          <div className="flex w-full lg:w-auto lg:flex-1 gap-2 md:gap-3">
            <div className="flex items-center flex-1 border border-gray-500 rounded-lg p-3 bg-gray-50 dark:bg-gray-700 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
              <MdDateRange className="text-gray-700 dark:text-gray-300 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Check-in"
                className="w-full bg-transparent outline-none text-sm dark:text-gray-300 md:text-base"
              />
            </div>
            <div className="flex items-center flex-1 border border-gray-500 rounded-lg p-3 bg-gray-50 dark:bg-gray-700 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
              <MdDateRange className="text-gray-700 dark:text-gray-300 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Check-out"
                className="w-full bg-transparent outline-none text-sm dark:text-gray-300 md:text-base"
              />
            </div>
          </div>

          {/* Guests Input */}
          <div className="flex items-center w-full lg:w-auto lg:flex-1 border border-gray-500 rounded-lg p-3 bg-gray-50 dark:bg-gray-700 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
            <FaUser className="text-gray-700 dark:text-gray-300 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="2 guests"
              className="w-full bg-transparent outline-none text-sm dark:text-gray-300 md:text-base"
            />
          </div>

          {/* Search Button */}
          <button className="w-full lg:w-auto bg-[#1668e3] text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-600 active:bg-blue-700 transition-all hover:shadow-lg whitespace-nowrap">
            Search
          </button>
        </div>
      </div>
        </div>
    );
};

export default SearchBar;