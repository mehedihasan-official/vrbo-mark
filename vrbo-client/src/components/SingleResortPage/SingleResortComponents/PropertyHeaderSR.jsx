import StarRating from "./StartRatingSR";

const PropertyHeader = ({ resort }) => (
  <div className="flex justify-between items-start mb-4">
    
    <div className="flex-1 pr-6">
      
      {/* Title */}
      <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white leading-snug mb-1 max-w-2xl transition-colors">
        {resort.title || "Gulf Side 402 🌊 Pet Friendly / Gulf Front"}
      </h1>

      {/* Location */}
      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-2 transition-colors">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-gray-400 dark:text-gray-500"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        <span>{resort.location || "Gulf Shores, Alabama, US"}</span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-flex items-center gap-1 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700 rounded-full px-3 py-1 text-xs font-bold transition">
          🐾 Pet Friendly
        </span>

        <span className="inline-flex items-center gap-1 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700 rounded-full px-3 py-1 text-xs font-bold transition">
          🌊 Gulf Front
        </span>

        {resort.category && (
          <span className="inline-flex items-center gap-1 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700 rounded-full px-3 py-1 text-xs font-bold transition">
            🏨 {resort.category}
          </span>
        )}
      </div>

      <StarRating rating={4.8} reviews={127} />
    </div>

    {/* Share & Save */}
    <div className="flex items-center gap-2 shrink-0 mt-1">
      
      <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        Share
      </button>

      <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        Save
      </button>

    </div>
  </div>
);

export default PropertyHeader;