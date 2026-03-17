import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import Upcoming from "./FilterMenu/Upcoming";
import Complete from "./FilterMenu/Complete";
import AllReservation from "./FilterMenu/AllReservation";
import Canceled from "./FilterMenu/Canceled";


const Reservations = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const { hotelData = [], loading } = useContext(AuthContext);

  const totalReturn = hotelData
    .filter((item) => item.status && item.status.toLowerCase() === "complete")
    .reduce((sum, item) => sum + Number(item.weekPrice || item.totalPrice || 0), 0);

  const renderContent = () => {
    if (loading) return (
      <div className="col-span-2 flex justify-center mt-10">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );

    switch (selectedFilter) {
      case "Upcoming": return <Upcoming />;
      case "Complete": return <Complete />;
      case "Canceled": return <Canceled />;
      case "All": return <AllReservation />;
      default: return <AllReservation />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 overflow-x-hidden flex flex-col items-center mt-5 bg-white dark:bg-gray-950 transition-colors duration-300">
      <h2 className="text-xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">Reservations</h2>

      {selectedFilter === "Complete" && totalReturn > 0 && (
        <div className="w-full max-w-sm mb-6 py-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl text-center shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Overall Return (Completed)</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">${totalReturn.toLocaleString()}</p>
        </div>
      )}

      <div className="flex items-center justify-center gap-6 md:gap-10 mb-4 w-full">
        {["Upcoming", "Complete","Canceled", "All"].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`cursor-pointer text-sm md:text-base transition-colors ${
              selectedFilter === filter
                ? "text-blue-500 font-bold"
                : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="w-full max-w-md border-t border-gray-300 dark:border-gray-700 mb-5" />

      <div className="w-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default Reservations;