import { FaMoon, FaSignOutAlt, FaSun, FaUserCircle } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { Link } from "react-router";
import Loading from "../../../components/Loading";
import { useTheme } from "../../../hooks/useTheme";

const DesktopResponsive = ({
  navItems,
  isActiveLink,
  loading,
  isUserLoggedIn,
  usersData,
  handleSignOut,
}) => {

  const { isDark, toggleTheme } = useTheme();

  // Reusable toggle button
  const ThemeToggleButton = () => (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="p-2 rounded-full transition-colors duration-200
        bg-gray-100 hover:bg-gray-200
        dark:bg-gray-700 dark:hover:bg-gray-600"
    >
      {isDark
        ? <FaSun className="text-yellow-400 text-lg" />
        : <FaMoon className="text-gray-700 dark:text-gray-300 text-lg" />
      }
    </button>
  );

  return (
    <div className="hidden md:flex items-center gap-6">

      {/* Navigation */}
      <nav className="hidden lg:flex gap-8 items-center">

        {/* Open App Button */}
        <button className="hidden lg:flex items-center gap-2 border 
          border-gray-300 dark:border-gray-600
          px-4 py-2 rounded-full
          text-blue-700 dark:text-blue-400
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition">
          <span className="text-sm font-semibold">Open app</span>
          <IoMdDownload />
        </button>

        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`font-semibold transition ${
              isActiveLink(item.path)
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User Section */}
      {loading ? (
        <Loading className="animate-spin text-xl text-blue-600 dark:text-blue-400" />
      ) : isUserLoggedIn ? (
        <Link
          className="flex items-center gap-4"
          to="/hosting-dashboard/listings"
        >
          <button onClick={handleSignOut}>
            <FaSignOutAlt className="text-xl text-gray-600 dark:text-gray-300 hover:text-red-600 transition" />
          </button>

          {usersData?.imageURL ? (
            <img
              src={usersData.imageURL}
              className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-600"
              alt="Profile"
            />
          ) : (
            <FaUserCircle className="text-3xl text-gray-600 dark:text-gray-300" />
          )}
        </Link>
      ) : (
        <Link
          to="/login"
          className="bg-blue-600 dark:bg-blue-500
            hover:bg-blue-700 dark:hover:bg-blue-600
            text-white px-5 py-2 rounded-full transition"
        >
          Sign In
        </Link>
      )}

      {/* Theme Toggle */}
      <ThemeToggleButton />
    </div>
  );
};

export default DesktopResponsive;