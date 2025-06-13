import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaPlus, FaList, FaClipboardList, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clear_name, clear_admin_auth } from "../store/slices/TokenSlice"; 

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const name = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    dispatch(clear_name());
    dispatch(clear_admin_auth());
    navigate("/");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">HQ <span className="text-orange-700">FOODS</span></h1>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white focus:outline-none"
        >
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <aside 
        className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-gray-800 text-white p-4 space-y-4 transition-all duration-300`}
      >
        <h1 className="hidden md:block text-2xl font-bold p-2">HQ <span className="px-1 text-orange-700">FOODS</span></h1>
        <NavLink to="add-item" onClick={() => setSidebarOpen(false)} className={({ isActive }) => isActive ? "flex items-center bg-gray-700 p-3 rounded-lg text-base md:text-lg" : "flex items-center p-3 rounded-lg hover:bg-gray-700 text-base md:text-lg"}>
          <FaPlus className="mr-3" /> Add Item
        </NavLink>
        <NavLink to="all-items" onClick={() => setSidebarOpen(false)} className={({ isActive }) => isActive ? "flex items-center bg-gray-700 p-3 rounded-lg text-base md:text-lg" : "flex items-center p-3 rounded-lg hover:bg-gray-700 text-base md:text-lg"}>
          <FaList className="mr-3" /> All Items
        </NavLink>
        <NavLink to="orders" onClick={() => setSidebarOpen(false)} className={({ isActive }) => isActive ? "flex items-center bg-gray-700 p-3 rounded-lg text-base md:text-lg" : "flex items-center p-3 rounded-lg hover:bg-gray-700 text-base md:text-lg"}>
          <FaClipboardList className="mr-3" /> Orders
        </NavLink>
      </aside>

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-semibold">Admin Panel</h2>
          <div className="flex items-center space-x-4">
            <p className="text-gray-600 text-sm md:text-base">{name} (Admin)</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
