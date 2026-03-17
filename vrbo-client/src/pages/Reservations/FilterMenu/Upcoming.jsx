import React, { useContext } from "react";
import InfoCard from "../../../components/InfoCard/InfoCard";
import { AuthContext } from "../../../providers/AuthProvider/AuthProvider";

const Upcoming = () => {
  const { hotelData } = useContext(AuthContext);

  const hiltonResorts = hotelData
    ? [...hotelData]
        .filter((hotel) => hotel.title?.toLowerCase().includes("hilton"))
        .sort((a, b) => b.id - a.id) // highest IDs first
        .slice(0, 4)                  // only 4 resorts
    : [];

  if (!hotelData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (hiltonResorts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-2">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-lg font-medium text-gray-500">No upcoming reservations found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Upcoming Reservations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {hiltonResorts.map((resort) => (
          <div key={resort.id} className="relative">
            {/* Upcoming Badge */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              🗓️ Upcoming
            </div>
            <InfoCard data={resort} />
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Showing {hiltonResorts.length} upcoming reservation{hiltonResorts.length !== 1 ? "s" : ""}</p>
      </div>
    </div>
  );
};

export default Upcoming;