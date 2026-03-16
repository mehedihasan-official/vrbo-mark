import { useContext, useEffect, useState } from "react";
import Cards from "../../components/Cards/Cards";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";

const Reservations = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const { hotelData = [], loading } = useContext(AuthContext);

  useEffect(() => { filterData("All") }, [hotelData]);

  const filterData = (filter) => {
    let result = [];
    // ✅ Fix
if (filter === "All") {
  result = hotelData.sort((a, b) => a.id - b.id);
    } else {
      result = hotelData.filter((item) => item.status && item.status.toLowerCase() === filter.toLowerCase());
    }
    setFilteredData(result);
    setSelectedFilter(filter);
  };

  const totalReturn = hotelData
    .filter((item) => item.status && item.status.toLowerCase() === "complete")
    .reduce((sum, item) => sum + Number(item.weekPrice || item.totalPrice || 0), 0);

  const renderFilteredData = () => {
    if (loading) return <div className="col-span-2 flex justify-center mt-10"><p className="text-gray-600 dark:text-gray-400">Loading...</p></div>;

    if (filteredData.length === 0) {
      if (selectedFilter === "Upcoming") return (
        <div className="col-span-2 flex justify-center mt-10">
          <p className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200">You have no upcoming reservations.</p>
        </div>
      );
      return (
        <div className="col-span-2 flex justify-center mt-10">
          <p className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200">
            No results found.<br />
            <span className="font-normal text-gray-600 dark:text-gray-400">Please try a different filter.</span>
          </p>
        </div>
      );
    }

    return filteredData.map((item, index) => (
      <div key={item._id || index} className="relative">
        {selectedFilter !== "All" && (
          <div className={`absolute top-3 left-3 z-10 text-xs font-semibold px-3 py-1 rounded-full shadow ${
            item.status?.toLowerCase() === "complete" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
            : item.status?.toLowerCase() === "upcoming" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
          }`}>
            {item.status}
          </div>
        )}
        <Cards data={item} />
        {(item.status?.toLowerCase() === "complete" || item.status?.toLowerCase() === "upcoming") && selectedFilter !== "All" && (
          <div className="mt-1 px-2 text-sm text-gray-600 dark:text-gray-400 flex justify-between">
            <span>{item.nights ? `${item.nights} nights` : "1 week"}</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Total: ${Number(item.weekPrice || item.totalPrice || 0).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    ));
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
        {["Upcoming", "Complete", "Canceled", "All"].map((filter) => (
          <button key={filter} onClick={() => filterData(filter)}
            className={`cursor-pointer text-sm md:text-base transition-colors ${
              selectedFilter === filter ? "text-blue-500 font-bold" : "text-gray-600 dark:text-gray-400 hover:text-blue-500"
            }`}>
            {filter}
          </button>
        ))}
      </div>

      <div className="w-full max-w-md border-t border-gray-300 dark:border-gray-700 mb-5" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full justify-items-center">
        {renderFilteredData()}
      </div>
    </div>
  );
};

export default Reservations;
