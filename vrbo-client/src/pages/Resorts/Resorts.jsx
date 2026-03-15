import { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaTree, FaUmbrellaBeach, FaWarehouse } from "react-icons/fa";
import { GiIsland } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { MdHouseboat } from "react-icons/md";
import Cards from "../../components/Cards/Cards";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import Loading from "../../components/Loading";

const CATEGORIES = [
  "All",
  "Tropical",
  "Beach",
  "Tiny homes",
  "Farms",
  "Islands",
];
const CATEGORY_ICONS = {
  All: <IoHome />,
  Tropical: <FaTree />,
  Beach: <FaUmbrellaBeach />,
  "Tiny homes": <MdHouseboat />,
  Farms: <FaWarehouse />,
  Islands: <GiIsland />,
};
const ITEMS_PER_PAGE = 8;

const Resorts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { hotelData } = useContext(AuthContext);

  useEffect(() => {
    if (hotelData && hotelData.length >= 0) setLoading(false);
  }, [hotelData]);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const filteredAll = hotelData
    ? hotelData
        .filter(
          (item) =>
            selectedCategory === "All" || item.category === selectedCategory,
        )
        .filter((item) => {
          const term = searchTerm.toLowerCase();
          return (
            (item.name && item.name.toLowerCase().includes(term)) ||
            (item.title && item.title.toLowerCase().includes(term)) ||
            (item.location && item.location.toLowerCase().includes(term))
          );
        })
    : [];

  const totalPages = Math.ceil(filteredAll.length / ITEMS_PER_PAGE);
  const filteredData = filteredAll.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Hero */}
      <section
        className="relative h-72 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/600234276.jpg?k=604573baa332da82d384c12b12ac00941e7dcb8e309ed657dbcd9e5b0fea26a1&o=&hp=1')",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Discover Your Next Dream Resort
          </h1>
          <p className="text-base md:text-lg text-white/80">
            Find the best resorts that suit your style and budget.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm px-5 py-3 w-full max-w-2xl gap-3 focus-within:ring-2 focus-within:ring-blue-400 transition">
            <BsSearch size={18} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by name or location..."
              className="flex-1 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 outline-none bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none transition"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="overflow-x-auto pb-1 mb-8">
          <div className="flex justify-start md:justify-center gap-8 min-w-max md:min-w-0 px-2">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="relative flex flex-col items-center gap-1.5 pb-3 transition-all duration-200 group"
                >
                  <span
                    className={`text-xl transition-all duration-200 ${isActive ? "text-blue-600 scale-110" : "text-gray-500 dark:text-gray-400 group-hover:text-blue-500 group-hover:scale-110"}`}
                  >
                    {CATEGORY_ICONS[category]}
                  </span>
                  <span
                    className={`text-xs font-semibold whitespace-nowrap transition-colors duration-200 ${isActive ? "text-blue-600" : "text-gray-600 dark:text-gray-400 group-hover:text-blue-500"}`}
                  >
                    {category}
                  </span>
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-200 ${isActive ? "w-6 bg-blue-600 opacity-100" : "w-0 opacity-0"}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredAll.length === 0
              ? "No resorts found"
              : `${filteredAll.length} resort${filteredAll.length !== 1 ? "s" : ""} found`}
            {searchTerm && (
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {" "}
                for "{searchTerm}"
              </span>
            )}
            {selectedCategory !== "All" && (
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {" "}
                in {selectedCategory}
              </span>
            )}
          </p>
        </div>

        {/* Cards Grid */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredData.map((item, index) => (
              <Cards key={item.id ?? index} data={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-5xl mb-4">🏖️</span>
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-1">
              No resorts found
            </h3>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
              Try a different search term or category.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 mt-10">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              ‹
            </button>
            {getPageNumbers().map((page, idx) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-3 py-2 text-gray-400 text-sm"
                >
                  …
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-9 h-9 rounded-lg text-sm font-semibold transition ${
                    currentPage === page
                      ? "bg-blue-600 text-white border border-blue-600 shadow-sm"
                      : "border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {page}
                </button>
              ),
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              ›
            </button>
          </div>
        )}
        {totalPages > 1 && (
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-3">
            Page {currentPage} of {totalPages}
          </p>
        )}
      </div>
    </div>
  );
};

export default Resorts;
