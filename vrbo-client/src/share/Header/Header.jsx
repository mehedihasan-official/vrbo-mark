import { useContext, useEffect, useState } from "react";
import {
  FaBuilding,
  FaEnvelope,
  FaHome,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { IoMdDownload } from "react-icons/io";
import { MdClose, MdMenu } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { Link, useLocation } from "react-router";
import Swal from "sweetalert2";
import logo from "../../../src/assets/vrbo_logo.svg";
import DesktopResponsive from "./HeaderComponents/DesktopResponsive";
import MobileResponsive from "./HeaderComponents/MobileResponsive";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, usersData, loading, signOut, admin } =
    useContext(AuthContext);
  const location = useLocation();

  const isUserLoggedIn = !!user;

  const navItems = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/resorts", label: "Resorts", icon: <FaBuilding /> },
    {
      path: admin
        ? "/admin-panel/admin-overview"
        : "/hostingDashboard/listings",
      label: admin ? "Admin Panel" : "My Hosting",
      icon: admin ? <RiAdminFill /> : <FaBuilding />,
    },
    { path: "/contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  const handleSignOut = () => {
    Swal.fire({
      title: "Logged Out Successfully",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      signOut();
      setMobileMenuOpen(false);
    });
  };

  const isActiveLink = (path) => location.pathname === path;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">

          <Link to="/">
            <img src={logo} className="w-24" alt="VRBO Logo" />
          </Link>

          <DesktopResponsive
            navItems={navItems}
            isActiveLink={isActiveLink}
            loading={loading}
            isUserLoggedIn={isUserLoggedIn}
            usersData={usersData}
            handleSignOut={handleSignOut}
          />

          <MobileResponsive
            navItems={navItems}
            isActiveLink={isActiveLink}
            loading={loading}
            isUserLoggedIn={isUserLoggedIn}
            usersData={usersData}
            handleSignOut={handleSignOut}
            isMobileMenuOpen={isMobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />

        </div>
      </div>
    </header>
  );
};

export default Header;