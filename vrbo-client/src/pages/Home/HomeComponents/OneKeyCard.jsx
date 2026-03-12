import React from "react";
import OneKeyPhoto from "../../../assets/images/ONEKEY-img.webp";
import OneKeyCardImg from "../../../assets/images/One-Key-card-with-border-.webp";

const OneKeyCard = () => {
  return (
    <div className="py-8 px-4 md:px-8 bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto border border-gray-700 rounded-2xl overflow-hidden bg-gray-800 transition-colors duration-300 shadow-lg">
        
        <div className="flex flex-row items-center">
          
          {/* Left Image Section */}
          <div className="relative w-1/2">
            <img
              src={OneKeyPhoto}
              alt="OneKey"
              className="w-full h-[180px] md:h-[260px] object-cover rounded-l-2xl"
            />

            {/* Overlapping Card Image */}
            <img
              src={OneKeyCardImg}
              alt="OneKey Card"
              className="absolute mr-6 -right-10 md:-right-10 top-1/2 -translate-y-1/2 w-22 md:w-30 shadow-xl"
            />
          </div>

          {/* Right Content Section */}
          <div className="w-1/2 p-4 md:p-8 md:pl-8 flex justify-between items-center">
            <div>
              <h2 className="text-base md:text-2xl font-semibold text-white mb-1 md:mb-2">
                Earn $350 in OneKeyCash™
              </h2>
              <p className="text-xs md:text-base text-gray-300">
                after qualifying purchases. Terms apply.
              </p>
            </div>

            {/* Arrow */}
            <div className="text-lg md:text-2xl text-gray-300">
              →
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OneKeyCard;