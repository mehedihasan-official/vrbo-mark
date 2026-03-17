import { FaCalendarAlt, FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { Link } from "react-router";

const InfoCard = ({
  data,
  showLocation = true,
  showDate = true,
  showPrice = true,
  showCategory = false,
}) => {
  const { id, price, date, location, image, title, description, category } =
    data;

    console.log(data)

  // Truncate description to specified number of lines
  const truncateText = (text, lines = 3) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= 30) return text;
    return words.slice(0, 30).join(" ") + "...";
  };

  return (
    <div className="w-full max-w-md mx-auto lg:max-w-lg">
      <Link to={`/singleResort/${id}`} className="block group">
        <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:-translate-y-1">
          {/* Image Section */}
          <div className="relative overflow-hidden">
            <img
              src={image || "https://via.placeholder.com/500x300"}
              alt={title || `Property ${id}`}
              className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Category Badge */}
            {showCategory && category && (
              <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold shadow-lg flex items-center gap-1.5">
                <FaTag className="text-xs" />
                {category}
              </div>
            )}

            {/* Price Badge */}
            {showPrice && price && (
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">
                    {price}
                  </span>
                  <span className="text-xs text-gray-600">/night</span>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
            {/* Title */}
            {title && (
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                {title}
              </h3>
            )}

            {/* Description */}
            {description && (
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3">
                {description}
              </p>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-2">
              {/* Location */}
              {showLocation && location && (
                <div className="flex items-start gap-2 text-gray-700">
                  <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0 text-sm" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Location
                    </p>
                    <p className="text-sm sm:text-base font-semibold line-clamp-1">
                      {location}
                    </p>
                  </div>
                </div>
              )}

              {/* Date */}
              {showDate && date && (
                <div className="flex items-start gap-2 text-gray-700">
                  <FaCalendarAlt className="text-green-500 mt-1 flex-shrink-0 text-sm" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Available
                    </p>
                    <p className="text-sm sm:text-base font-semibold">{date}</p>
                  </div>
                </div>
              )}
            </div>

            {/* View Details Button - Shows on Hover */}
            <div className="pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all">
                View Full Details →
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default InfoCard;
