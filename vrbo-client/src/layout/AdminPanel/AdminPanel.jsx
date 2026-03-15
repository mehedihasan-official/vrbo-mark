import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router";
import { Transition } from "@headlessui/react";
import {
  MdViewQuilt,
  MdAttachMoney,
  MdAddHome,
} from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import logo from "../../../src/assets/vrbo_logo.svg";

const AdminPanel = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuItemClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white shadow-md">
        <div className="flex items-center justify-center py-6 border-b">
          <img src={logo} alt="Logo" className="w-22 h-8" />
        </div>

        <ul className="flex-1 p-4 space-y-3 font-semibold text-gray-700">
          <li>
            <Link to="admin-overview" className="flex items-center gap-2 hover:text-blue-600">
              <MdViewQuilt /> Admin Overview
            </Link>
          </li>

          <li>
            <Link to="user-control" className="flex items-center gap-2 hover:text-blue-600">
              <AiOutlineUsergroupAdd /> User Control
            </Link>
          </li>

          <li>
            <Link to="earnings-update" className="flex items-center gap-2 hover:text-blue-600">
              <MdAttachMoney /> Earnings Update
            </Link>
          </li>

          <li>
            <Link to="admin-control" className="flex items-center gap-2 hover:text-blue-600">
              <RiAdminLine /> Admin Control
            </Link>
          </li>

          <li>
              <Link to="/admin-panel/create-new-list" className="flex items-center gap-2 hover:text-blue-600">
                <MdAddHome /> Create a new list
              </Link>
            </li>


          <div className="border-t my-4"></div>

          <li>
            <Link to="/" className="flex items-center gap-2 hover:text-blue-600">
              <FaHome /> Home
            </Link>
          </li>

          <li>
            <Link to="/profile" className="flex items-center gap-2 hover:text-blue-600">
              <FaUserCircle /> Profile
            </Link>
          </li>
        </ul>
      </aside>

      {/* ================= MOBILE HEADER ================= */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white z-50 shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <button onClick={() => setMobileMenuOpen(true)} className="text-2xl">
            <BsFillMenuButtonWideFill />
          </button>
        </div>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      <Transition
        show={mobileMenuOpen}
        enter="transition duration-300"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition duration-300"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex">
          <div className="w-64 bg-white h-full p-5 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)} className="text-2xl">
                <IoMdClose />
              </button>
            </div>

            <ul className="space-y-4 font-semibold text-gray-700">
              <li>
                <button onClick={() => handleMenuItemClick("/admin-panel/admin-overview")}
                  className="flex items-center gap-2 w-full text-left">
                  <MdViewQuilt /> Admin Overview
                </button>
              </li>

              <li>
                <button onClick={() => handleMenuItemClick("/admin-panel/user-control")}
                  className="flex items-center gap-2 w-full text-left">
                  <AiOutlineUsergroupAdd /> User Control
                </button>
              </li>

              <li>
                <button onClick={() => handleMenuItemClick("/admin-panel/earnings-update")}
                  className="flex items-center gap-2 w-full text-left">
                  <MdAttachMoney /> Earnings Update
                </button>
              </li>

              <li>
                <button onClick={() => handleMenuItemClick("/admin-panel/admin-control")}
                  className="flex items-center gap-2 w-full text-left">
                  <RiAdminLine /> Admin Control
                </button>
              </li>

              <div className="border-t my-4"></div>

              <li>
                <button onClick={() => handleMenuItemClick("/")}
                  className="flex items-center gap-2 w-full text-left">
                  <FaHome /> Home
                </button>
              </li>

              <li>
                <button onClick={() => handleMenuItemClick("/profile")}
                  className="flex items-center gap-2 w-full text-left">
                  <FaUserCircle /> Profile
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Transition>

      {/* ================= CONTENT AREA ================= */}
      <main className="flex-1 p-4 lg:p-8 mt-16 lg:mt-0 w-full overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
