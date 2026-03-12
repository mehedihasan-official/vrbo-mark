import { useState } from "react";
import { FaBed, FaHeart, FaMapMarkerAlt, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router";

const Cards = ({ data = {} }) => {
  const [isLiked, setIsLiked] = useState(false);

  const {
    id,
    price,
    title,
    location,
    bed,
    weekPrice,
    totalPrice,
    nights,
    image,
    reviews_amount,
    bedrooms,
    bathrooms,
    sleeps,
    type,
  } = data || {};

  const rating = (Math.random() * 3 + 7).toFixed(1);

  if (!id) return null;

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const displayImage = Array.isArray(image)
    ? image[0]
    : image || "https://via.placeholder.com/400x300";

  const bedLabel =
    bed === "Studio"
      ? "Studio"
      : bed
        ? `${bed} Bedroom${parseInt(bed) > 1 ? "s" : ""}`
        : `${bedrooms || 1} Bedroom`;

  const renderPrice = () => {
    if (weekPrice) {
      return (
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ${parseInt(weekPrice).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">per week</p>
        </div>
      );
    }

    if (totalPrice && nights) {
      return (
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ${parseInt(totalPrice).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {nights} nights total
          </p>
        </div>
      );
    }

    return (
      <div className="text-right">
        <p className="text-lg font-bold text-gray-900 dark:text-white">
          {price || "$568"}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          avg per night
        </p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <Link to={`/singleResort/${id}`} className="block">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300 hover:shadow-md dark:hover:shadow-gray-700">
          {/* Image Section */}
          <div className="relative">
            <img
              src={displayImage}
              alt={title}
              className="w-full h-56 object-cover"
            />

            {/* Heart Button */}
            <button
              onClick={handleLike}
              className="absolute top-3 right-3 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md"
            >
              {isLiked ? (
                <FaHeart className="text-red-500 text-lg" />
              ) : (
                <FaRegHeart className="text-gray-600 dark:text-gray-300 text-lg" />
              )}
            </button>
          </div>

          {/* Content Section */}
          <div className="p-4 space-y-2">
            {/* Property Type */}
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {type || "Resort"}
            </p>

            {/* Title */}
            <h2 className="text-base font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2">
              {title || "Unknown Property"}
            </h2>

            {/* Location */}
            {location && (
              <div className="flex items-start gap-1 text-sm text-gray-500 dark:text-gray-400">
                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-gray-400 dark:text-gray-500" />
                <span className="line-clamp-1">{location}</span>
              </div>
            )}

            {/* Property Details */}
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <FaBed className="text-gray-400 dark:text-gray-500" />
              <span>
                {sleeps || 4} Sleeps · {bedLabel} · {bathrooms || 1} Bath
              </span>
            </div>

            {/* Bottom Section */}
            <div className="flex justify-between items-end pt-2 border-t border-gray-100 dark:border-gray-700">
              {/* Rating + Reviews */}
              <div className="flex items-center gap-2">
                <div className="bg-green-600 text-white text-sm font-semibold px-2 py-0.5 rounded-md">
                  {rating}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {reviews_amount || 49} reviews
                </span>
              </div>

              {/* Price */}
              {renderPrice()}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cards;
