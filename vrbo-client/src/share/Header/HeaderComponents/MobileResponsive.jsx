import { FaMoon, FaSignOutAlt, FaSun, FaUserCircle } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { MdClose, MdMenu } from "react-icons/md";
import { Link } from "react-router";
import Loading from "../../../components/Loading";
import { useTheme } from "../../../providers/ThemeProvider";
const MobileResponsive = ({
  navItems,
  isActiveLink,
  loading,
  isUserLoggedIn,
  usersData,
  handleSignOut,
  isMobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const { isDark, toggleTheme } = useTheme();

  const ThemeToggleButton = () => (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="p-2 rounded-full transition-colors duration-200
        bg-gray-100 hover:bg-gray-200
        dark:bg-gray-700 dark:hover:bg-gray-600"
    >
      {isDark ? (
        <FaSun className="text-yellow-400 text-lg" />
      ) : (
        <FaMoon className="text-gray-600 text-lg dark:text-gray-300" />
      )}
    </button>
  );

  return (
    <div className="flex md:hidden items-center gap-3">
      {/* Open App Button */}
      <button className="flex items-center gap-1 border border-blue-600 dark:border-blue-400 px-3 py-1.5 rounded-full text-xs text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/30 transition">
        Open app
        <IoMdDownload />
      </button>

      {/* User Section */}
      {loading ? (
        <Loading className="animate-spin text-lg text-blue-600 dark:text-blue-400" />
      ) : isUserLoggedIn ? (
        <Link to="/hostingDashboard/listings">
          {usersData?.imageURL ? (
            <img
              src={usersData.imageURL}
              className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 transition"
              alt="Profile"
            />
          ) : (
            <FaUserCircle className="text-3xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition" />
          )}
        </Link>
      ) : (
        <Link
          to="/login"
          className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          Sign In
        </Link>
      )}

      {/* Theme Toggle */}
      <ThemeToggleButton />

      {/* Menu Toggle */}
      <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? (
          <MdClose className="text-2xl text-gray-800 dark:text-gray-200" />
        ) : (
          <MdMenu className="text-2xl text-gray-800 dark:text-gray-200" />
        )}
      </button>

      {/* ================= SLIDE MENU ================= */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Sliding Panel */}
        <div
          className={`absolute right-0 top-0 h-1/2 w-4/5 max-w-sm 
          bg-white dark:bg-gray-900
          shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Menu
            </h2>
            <button onClick={() => setMobileMenuOpen(false)}>
              <MdClose className="text-2xl text-gray-800 dark:text-gray-200" />
            </button>
          </div>

          {/* User Info Section */}
          {isUserLoggedIn && (
            <div className="flex items-center gap-3 p-5 border-b border-gray-200 dark:border-gray-700">
              {usersData?.imageURL ? (
                <img
                  src={usersData.imageURL}
                  className="w-12 h-12 rounded-full object-cover"
                  alt="Profile"
                />
              ) : (
                <FaUserCircle className="text-4xl text-gray-500 dark:text-gray-400" />
              )}
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {usersData?.name || "Welcome Back"}
                </p>
                <Link
                  to="/hostingDashboard/listings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-blue-600 dark:text-blue-400"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <ul className="p-5 space-y-5">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-base font-medium transition ${
                    isActiveLink(item.path)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom Section */}
          {isUserLoggedIn ? (
            <div className="absolute bottom-0 left-0 w-full p-5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <button
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white py-2.5 rounded-lg transition"
              >
                <FaSignOutAlt />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="absolute bottom-0 left-0 w-full p-5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2.5 rounded-lg transition"
              >
                <FaSignOutAlt />
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileResponsive;
