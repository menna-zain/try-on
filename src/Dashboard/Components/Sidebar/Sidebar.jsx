import React, { useContext } from "react";
import { authContext } from "../../../Contexts/AuthContext";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { LayoutDashboard, LogOut, Users } from "lucide-react";
import { AiOutlineUser } from "react-icons/ai";

export default function Sidebar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);

  function logOut() {
    Cookies.remove("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <>
    
      <aside className="fixed top-0 left-0 flex flex-col w-64 h-screen p-4 text-white bg-gray-800">
        {/* Top Part */}
        <div>
          <h1 className="mb-6 text-xl font-bold font-heading">E-Commerce</h1>
          <nav className="space-y-2 font-body">
            <Link
              to={"/dashboard"}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
            >
              <LayoutDashboard size={20} /> <span>Home</span>
            </Link>
            <Link
              to={"/dashboard/products"}
              className="block p-2 rounded hover:bg-gray-700"
            >
              <span> Products</span>
            </Link>
            <Link
              to={"/dashboard/orders"}
              className="block p-2 rounded hover:bg-gray-700"
            >
              <span> Orders</span>
            </Link>
            <Link
              to={"/dashboard/categories"}
              className="block p-2 rounded hover:bg-gray-700"
            >
              <span> Categories</span>
            </Link>
          </nav>
        </div>

        {/* Bottom Part */}
        <div className="pt-4 mt-8 space-y-4 border-t border-gray-700">
          <div className="space-y-2">
            <Link
             to={"/dashboard/profile"}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
            >
              <AiOutlineUser size={18} /> <span>Profile</span>
            </Link>
            <Link
             to={"/dashboard/users"}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
            >
              <Users size={18} /> <span>Users</span>
            </Link>
            <Link
              onClick={logOut}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-800"
            >
              <LogOut size={18} /> <span>Logout</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
