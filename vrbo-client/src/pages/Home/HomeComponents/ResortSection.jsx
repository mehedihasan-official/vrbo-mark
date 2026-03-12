// import { useContext, useEffect, useState } from "react";
// import { FaLongArrowAltRight, FaTree, FaUmbrellaBeach, FaWarehouse } from "react-icons/fa";
// import { GiIsland } from "react-icons/gi";
// import { MdHouseboat } from "react-icons/md";
// import Cards from "../../../components/Cards/Cards";
// import Loading from "../../../components/Loading";
// import { AuthContext } from "../../../providers/AuthProvider";
// import { IoHome, IoHomeOutline } from "react-icons/io5";
// import { Link } from "react-router";

// const ResortSection = () => {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const itemsPerPage = 8;

//   const { hotelData } = useContext(AuthContext);

//   useEffect(() => {
//     if (hotelData && hotelData.length >= 0) {
//       setLoading(false);
//     }
//   }, [hotelData]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [selectedCategory, searchTerm]);

//   const selectedCategories = [
//     "All",
//     "Tropical",
//     "Beach",
//     "Tiny homes",
//     "Farms",
//     "Islands",
//   ];

//   const categoryIcons = {
//     All: <IoHome />,
//     Tropical: <FaTree />,
//     Beach: <FaUmbrellaBeach />,
//     "Tiny homes": <MdHouseboat />,
//     Farms: <FaWarehouse />,
//     Islands: <GiIsland />,
//   };

//   const filteredDataWithoutPagination = hotelData
//     ? hotelData
//         .filter(
//           (item) =>
//             selectedCategory === "All" || item.category === selectedCategory
//         )
//         .filter(
//           (item) =>
//             (item.name &&
//               item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (item.location &&
//               item.location.toLowerCase().includes(searchTerm.toLowerCase()))
//         )
//     : [];

//   const filteredData = filteredDataWithoutPagination.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(
//     filteredDataWithoutPagination.length / itemsPerPage
//   );

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const getPageNumbers = () => {
//     const pages = [];
//     const maxPagesToShow = 5;

//     if (totalPages <= maxPagesToShow) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         pages.push(1, 2, 3, 4, "...", totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(
//           1,
//           "...",
//           totalPages - 3,
//           totalPages - 2,
//           totalPages - 1,
//           totalPages
//         );
//       } else {
//         pages.push(
//           1,
//           "...",
//           currentPage - 1,
//           currentPage,
//           currentPage + 1,
//           "...",
//           totalPages
//         );
//       }
//     }

//     return pages;
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <div className="p-6 md:p-10 lg:p-14">
//       {/* Heading */}
//       <div>
//         <h1 className="text-2xl md:text-3xl font-semibold mb-6">
//           Find your perfect place to stay
//         </h1>
//       </div>

//       {/* Filter Section */}
//       <div className="flex flex-col justify-center items-center mb-10">
//         <div className="w-full overflow-x-auto pb-2">
//           <div className="flex justify-start md:justify-center gap-6 min-w-max md:min-w-0 px-2">
//             {selectedCategories.map((category, index) => {
//               const isActive = selectedCategory === category;

//               return (
//                 <div>

//                 </div>,
//                 <Link
//                   key={index}
//                   onClick={() => setSelectedCategory(category)}
//                   className="relative flex flex-col items-center gap-1 transition-all duration-300 whitespace-nowrap"
//                 >
//                   {/* Icon */}
//                   <span
//                     className={`transition-all duration-300 ${
//                       isActive
//                         ? "text-blue-600 text-base md:text-lg scale-90"
//                         : "text-gray-600 text-lg md:text-xl hover:text-blue-500"
//                     }`}
//                   >
//                     {categoryIcons[category]}
//                   </span>

//                   {/* Label */}
//                   <span
//                     className={`text-sm md:text-base font-medium transition-colors duration-300 ${
//                       isActive ? "text-blue-600" : "text-gray-700"
//                     }`}
//                   >
//                     {category}
//                   </span>

//                   {/* Underline Indicator */}
//                   <span
//                     className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] w-6 rounded-full transition-all duration-300 ${
//                       isActive ? "bg-blue-600 opacity-100" : "opacity-0"
//                     }`}
//                   ></span>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Cards Section */}
//       {filteredData.length > 0 ? (
//         <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
//           {filteredData.map((item, index) => (
//             <Cards key={index} data={item} />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-16">
//           <div className="text-gray-400 text-6xl mb-4">🏠</div>
//           <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
//             No properties found
//           </h3>
//           <p className="text-gray-500">
//             Try adjusting your filters or search criteria
//           </p>
//         </div>
//       )}

//       {/* Pagination */}
//       {filteredData.length > 0 && totalPages > 1 && (
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-12">
//           {/* Previous */}
//           <button
//             className={`px-4 py-2 rounded-lg font-medium transition-all ${
//               currentPage === 1
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400"
//             }`}
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             ← Previous
//           </button>

//           {/* Page Numbers */}
//           <div className="flex items-center gap-2">
//             {getPageNumbers().map((page, index) => (
//               <button
//                 key={index}
//                 className={`min-w-[40px] h-10 rounded-lg font-medium transition-all ${
//                   page === "..."
//                     ? "cursor-default text-gray-400"
//                     : page === currentPage
//                     ? "bg-blue-500 text-white shadow-md"
//                     : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400"
//                 }`}
//                 onClick={() => page !== "..." && handlePageChange(page)}
//                 disabled={page === "..."}
//               >
//                 {page}
//               </button>
//             ))}
//           </div>

//           {/* Next */}
//           <button
//             className={`px-4 py-2 rounded-lg font-medium transition-all ${
//               currentPage === totalPages
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400"
//             }`}
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//           >
//             Next →
//           </button>
//         </div>
//       )}
//       <Link className="flex items-center gap-2 text-blue-500" to="/resorts">
//       <p className="text-blue-600">View More Properties </p>
//       <FaLongArrowAltRight />
//       </Link>
//     </div>
//   );
// };

// export default ResortSection;
