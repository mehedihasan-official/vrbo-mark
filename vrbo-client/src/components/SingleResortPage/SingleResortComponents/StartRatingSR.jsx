const StarRating = ({ rating = 4.8, reviews = 127 }) => (
  <div className="flex items-center gap-2 flex-wrap">
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? "#FF6B35" : "#e5e7eb"}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
    <span className="font-bold text-sm text-gray-900">{rating}</span>
    <span className="text-sm text-gray-500">({reviews} reviews)</span>
    <span className="text-gray-300">·</span>
    <span className="text-sm font-semibold text-gray-700 underline cursor-pointer hover:text-gray-900">
      Exceptional
    </span>
  </div>
);

export default StarRating;