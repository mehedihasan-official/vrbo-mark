import { useState } from "react";

const AmenityItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 py-2">
    <span className="text-xl w-6 text-center">{icon}</span>
    <span className="text-sm text-gray-700 dark:text-gray-300">
      {label}
    </span>
  </div>
);

const ALL_AMENITIES = [
  { icon: "🏊", label: "Pool" },
  { icon: "🌊", label: "Beachfront" },
  { icon: "🐾", label: "Pet friendly" },
  { icon: "🅿️", label: "Free parking" },
  { icon: "📶", label: "WiFi included" },
  { icon: "❄️", label: "Air conditioning" },
  { icon: "🍳", label: "Full kitchen" },
  { icon: "🧺", label: "Washer & dryer" },
  { icon: "🔥", label: "BBQ grill" },
  { icon: "🏖️", label: "Beach access" },
  { icon: "📺", label: "Smart TV" },
  { icon: "🚿", label: "Hot tub" },
];

const HIGHLIGHTS = [
  { icon: "🌊", title: "Beachfront location", desc: "Direct Gulf access with stunning water views from every room" },
  { icon: "🐾", title: "Pet friendly", desc: "Bring your furry companions — pets welcome with deposit" },
  { icon: "🏊", title: "Private pool access", desc: "Heated community pool just steps from the unit" },
  { icon: "🅿️", title: "Free parking included", desc: "Covered parking spot included in your stay" },
];

const HOUSE_RULES = [
  { icon: "⏰", label: "Check-in: After 4:00 PM" },
  { icon: "⏰", label: "Check-out: Before 10:00 AM" },
  { icon: "👶", label: "Children allowed" },
  { icon: "🎉", label: "No events or large groups" },
  { icon: "🐾", label: "Pets allowed (with fee)" },
  { icon: "🚭", label: "No smoking" },
];

const RATING_CATEGORIES = [
  { cat: "Cleanliness", val: 9.8 },
  { cat: "Communication", val: 9.6 },
  { cat: "Check-in", val: 9.7 },
  { cat: "Accuracy", val: 9.5 },
  { cat: "Location", val: 9.9 },
  { cat: "Value", val: 9.4 },
];

const REVIEWS = [
  {
    name: "Sarah M.",
    date: "Dec 2024",
    text: "Absolutely stunning views! The unit was spotless and exactly as described.",
    rating: "10/10",
  },
  {
    name: "James R.",
    date: "Nov 2024",
    text: "We had a great time! The apartment was clean and location unbeatable.",
    rating: "9/10",
  },
];

const PropertyDetails = ({ resort, guests }) => {
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const visibleAmenities = showAllAmenities
    ? ALL_AMENITIES
    : ALL_AMENITIES.slice(0, 6);

  return (
    <div>

      {/* Highlights */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 mb-6">
        <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-3">
          Highlights
        </h3>

        {HIGHLIGHTS.map((h, i) => (
          <div
            key={i}
            className="flex items-start gap-4 py-3 border-b border-blue-100 dark:border-blue-800 last:border-0"
          >
            <span className="text-2xl">{h.icon}</span>
            <div>
              <p className="font-bold text-sm text-gray-900 dark:text-white">
                {h.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {h.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-gray-100 dark:border-gray-800 my-6" />

      {/* About */}
      <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3">
        About this property
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
        {resort.description || "Property description here."}
      </p>

      <hr className="border-gray-100 dark:border-gray-800 my-6" />

      {/* Amenities */}
      <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
        Amenities
      </h2>

      <div className="grid grid-cols-2 gap-x-8">
        {visibleAmenities.map((a, i) => (
          <AmenityItem key={i} icon={a.icon} label={a.label} />
        ))}
      </div>

      <button
        onClick={() => setShowAllAmenities(!showAllAmenities)}
        className="mt-4 border border-gray-800 dark:border-gray-600 rounded-lg px-5 py-2.5 text-sm font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
      >
        {showAllAmenities
          ? "Show less"
          : `Show all ${ALL_AMENITIES.length} amenities`}
      </button>

      <hr className="border-gray-100 dark:border-gray-800 my-6" />

      {/* Reviews */}
      <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-4">
        Reviews
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {REVIEWS.map((r, i) => (
          <div
            key={i}
            className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-800"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-sm text-gray-900 dark:text-white">
                  {r.name}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {r.date}
                </p>
              </div>

              <span className="font-extrabold text-sm text-blue-600 dark:text-blue-400">
                {r.rating}
              </span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {r.text}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PropertyDetails;