import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { BsSearch } from "react-icons/bs";
import ListingCard from "../../components/ListingCard/ListingCard";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";

const Listings = () => {
  const { hotelListData, hotelData, loading, user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
  if (!loading && hotelData && hotelListData) {
    const matchedData = hotelData.filter((hotel) =>
      hotelListData.some((listItem) => listItem.name === hotel.title)
    );
    const filteredData = matchedData
      .filter((item) => {
        const itemName = item.title?.toLowerCase() || "";
        const itemLocation = item.location?.toLowerCase() || "";
        const search = searchTerm.toLowerCase();
        return itemName.includes(search) || itemLocation.includes(search);
      })
      .sort((a, b) => a.id - b.id); // 👈 sort by database id ascending

    setFilteredListings(filteredData);
  }
}, [hotelListData, hotelData, searchTerm, loading]);

  return (
    <div className="mt-8 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
      {/* Search input */}
      <div className="flex justify-center items-center relative w-4/5 md:w-1/2 mx-auto mb-4">
        <input
          type="text"
          placeholder="Search by name or location..."
          className="w-full p-2 pr-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <BsSearch size={20} className="absolute right-3 text-gray-400 dark:text-gray-500" />
      </div>

      {/* Listings count */}
      <div className="flex justify-start ml-10 md:ml-[280px]">
        <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">
          {user ? loading ? "Loading..." : `${filteredListings.length} Listings` : "Please log in to view listings"}
        </h2>
      </div>

      {/* Listing cards */}
      <div className="w-4/5 md:w-2/3 mx-auto">
        {user ? (
          loading ? (
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          ) : filteredListings.length ? (
            filteredListings.map((item) => (
              <div key={item.id} className="cursor-pointer hover:shadow-md transition-shadow duration-200 mb-4">
                <ListingCard item={item} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No listings found.</p>
          )
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Please log in to view listings.</p>
        )}
      </div>
    </div>
  );
};

export default Listings;