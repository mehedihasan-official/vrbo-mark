import { useState } from "react";
import StarRating from "./StartRatingSR";

const BookingCard = ({ pricePerNight }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000))
      : 7;

  const subtotal = pricePerNight * nights;
  const cleaningFee = Math.round(pricePerNight * 0.25);
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + cleaningFee + serviceFee;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg sticky top-5 bg-white dark:bg-gray-900 transition-colors duration-300">
      
      {/* Price */}
      <div className="mb-1">
        <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
          ${pricePerNight.toFixed(0)}
        </span>
        <span className="text-base font-normal text-gray-500 dark:text-gray-400">
          {" "} / night
        </span>
      </div>

      <div className="mb-4">
        <StarRating rating={4.8} reviews={127} />
      </div>

      {/* Date Inputs */}
      <div className="grid grid-cols-2 border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden mb-3">
        <div className="p-3 border-r border-gray-300 dark:border-gray-700">
          <p className="text-xs font-extrabold uppercase tracking-wide text-gray-700 dark:text-gray-300 mb-1">
            Check-in
          </p>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full text-sm text-gray-800 dark:text-gray-200 outline-none bg-transparent cursor-pointer"
          />
        </div>

        <div className="p-3">
          <p className="text-xs font-extrabold uppercase tracking-wide text-gray-700 dark:text-gray-300 mb-1">
            Check-out
          </p>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full text-sm text-gray-800 dark:text-gray-200 outline-none bg-transparent cursor-pointer"
          />
        </div>
      </div>

      {/* Guests */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-xl p-3 mb-4">
        <p className="text-xs font-extrabold uppercase tracking-wide text-gray-700 dark:text-gray-300 mb-1">
          Guests
        </p>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-800 dark:text-gray-200">
            {guests} guest{guests > 1 ? "s" : ""}
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-lg font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              −
            </button>

            <span className="font-bold text-gray-900 dark:text-white w-4 text-center">
              {guests}
            </span>

            <button
              onClick={() => setGuests(Math.min(12, guests + 1))}
              className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-lg font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Reserve Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base rounded-xl py-3.5 mb-2 transition">
        Reserve Now
      </button>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center mb-4">
        You won't be charged yet
      </p>

      {/* Price Breakdown */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
          <span className="underline cursor-pointer">
            ${pricePerNight.toFixed(0)} × {nights} nights
          </span>
          <span>${subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
          <span className="underline cursor-pointer">Cleaning fee</span>
          <span>${cleaningFee}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
          <span className="underline cursor-pointer">Vrbo service fee</span>
          <span>${serviceFee}</span>
        </div>

        <hr className="border-gray-100 dark:border-gray-700 my-2" />

        <div className="flex justify-between text-sm font-extrabold text-gray-900 dark:text-white">
          <span>Total (USD)</span>
          <span>${total.toLocaleString()}</span>
        </div>
      </div>

      <hr className="border-gray-100 dark:border-gray-700 my-4" />

      {/* Contact Host */}
      <button className="w-full border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-bold text-sm rounded-xl py-3 hover:bg-blue-50 dark:hover:bg-gray-800 transition">
        Contact host
      </button>

      {/* VrboCare Badge */}
      <div className="mt-4 p-3 bg-sky-50 dark:bg-sky-900/30 rounded-xl flex items-start gap-3">
        <span className="text-xl">🛡️</span>
        <div>
          <p className="text-sm font-bold text-sky-800 dark:text-sky-300">
            VrboCare™ included with every booking
          </p>
          <p className="text-xs text-sky-700 dark:text-sky-400 mt-0.5">
            Industry-leading protection for every trip you book through Vrbo.
          </p>
        </div>
      </div>

      {/* Report */}
      <div className="text-center mt-3">
        <button className="text-xs text-gray-400 dark:text-gray-500 underline hover:text-gray-600 dark:hover:text-gray-300 transition">
          Report this listing
        </button>
      </div>
    </div>
  );
};

export default BookingCard;