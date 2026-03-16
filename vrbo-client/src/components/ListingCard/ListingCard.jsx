import { Link } from "react-router";

const ListingCard = ({ item, index }) => {
  return (
    <Link to={`/hostingDashboard/individual-earnings/${item.id}`}>
      <div className="border border-gray-200 dark:border-gray-700 rounded mb-4 md:mb-4 p-4 flex items-center justify-between cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
        <div className="flex items-center gap-10">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={item.image} alt={`Listing ${index + 1}`} />
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {item.title}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
