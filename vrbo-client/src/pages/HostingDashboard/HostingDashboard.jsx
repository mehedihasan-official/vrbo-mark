import { Link, Outlet } from "react-router";
import { MdOutlineLuggage, MdMenu, MdClose, MdAddHome } from "react-icons/md";
import { LiaMoneyBillSolid } from "react-icons/lia";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { PiBookOpenText } from "react-icons/pi";
import { FaHome, FaUser } from "react-icons/fa";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { useContext, useState } from "react";
import logo from "../../../src/assets/vrbo_logo.svg";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import Loading from "../../components/Loading";
import { Transition } from "@headlessui/react";

const HostingDashboard = () => {
  const { loading } = useContext(AuthContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-950">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="lg:flex">
        {/* Sidebar — desktop */}
        <div className="hidden lg:block lg:w-64 lg:flex-shrink-0 bg-slate-200 dark:bg-gray-800">
          <div className="mt-5 ml-5">
            <Link to="/"><img src={logo} className="max-w-28 md:w-32" alt="Logo" /></Link>
          </div>
          <ul className="menu p-4 text-gray-700 dark:text-gray-300 font-bold text-lg">
            <li><Link to="listings" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"><HiOutlineHomeModern /> Listings</Link></li>
            <li><Link to="reservation" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"><MdOutlineLuggage /> Reservations</Link></li>
            <li><Link to="earnings" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"><LiaMoneyBillSolid /> Earnings</Link></li>
            <li><Link to="insights" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"><TbBrandGoogleAnalytics /> Insights</Link></li>
            <li><Link to="guide-books" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"><PiBookOpenText /> Guidebooks</Link></li>
            <div className="border border-gray-400 dark:border-gray-600 my-4"></div>
            <li><Link to="/" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"><FaHome /> Home</Link></li>
            <li><Link to="/hostingDashboard/profile" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"><FaUser /> Profile</Link></li>
          </ul>
        </div>

        {/* Content area */}
        <div className="flex-grow">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-slate-200 dark:bg-gray-800">
            <Link to="/"><img src={logo} className="w-32" alt="Logo" /></Link>
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none">
              {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <Transition show={isMobileMenuOpen} enter="transition-transform duration-300" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition-transform duration-300" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
            <div className="lg:hidden bg-slate-200 dark:bg-gray-800 p-4">
              <ul className="menu text-gray-700 dark:text-gray-300 font-bold text-lg">
                <li><Link to="listings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2"><HiOutlineHomeModern /> Listings</Link></li>
                <li><Link to="reservation" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2"><MdOutlineLuggage /> Reservations</Link></li>
                <li><Link to="earnings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2"><LiaMoneyBillSolid /> Earnings</Link></li>
                <li><Link to="insights" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2"><TbBrandGoogleAnalytics /> Insights</Link></li>
                <li><Link to="guide-books" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2"><PiBookOpenText /> Guidebooks</Link></li>
                <li><Link to="create-new-list" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2"><MdAddHome /> Create a new list</Link></li>
                <div className="border border-gray-400 dark:border-gray-600 my-4"></div>
                <li><Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2"><FaHome /> Home</Link></li>
                <li><Link to="/hostingDashboard/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2"><FaUser /> Profile</Link></li>
              </ul>
            </div>
          </Transition>

          {/* Page content */}
          <div className="p-4 bg-white dark:bg-gray-950 min-h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostingDashboard;
