import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { clear_token, set_token, set_name, clear_name } from "../store/slices/TokenSlice";
import { delete_cart_data } from "../store/slices/CartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { set_user_profile } from "../store/slices/userSlice";

const Navbar = ({ setShowLoginInPopUp, url }) => {
  const cartCount = useSelector(data => data.cart.items);
  const { token, name } = useSelector(data => data.auth);
  const profile  = useSelector(data => data.user.profile);
  const cartItemCount = Object.keys(cartCount).length;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkStyle = (isActive) =>
    `relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[3px] ${isActive
      ? "after:w-full after:bg-orange-700 text-orange-700"
      : "after:w-0 after:bg-transparent hover:text-orange-700 hover:after:bg-orange-700 hover:after:w-full transition-all duration-300"
    }`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (token && name) {
      dispatch(set_token(token));
      dispatch(set_name(name));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleLogout = () => {
    navigate('/');
    dispatch(clear_token());
    dispatch(clear_name());
    dispatch(delete_cart_data());
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    toast.success("Successfully Logout");
  };

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile", file);

    try {
      const res = await axios.post(`${url}/api/user/profile`, formData, {
        headers: { token },
      });
      toast.success(res.data.message);
      dispatch(set_user_profile(res.data.image));

    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white flex items-center justify-between py-4 lg:px-9 px-7 mb-6">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800 font-bold">
            HQ <span className="text-orange-700 px-1">FOODS</span>
          </h1>
        </Link>
      </div>

      <nav className="hidden lg:flex ml-24 gap-8 text-[16px] md:text-[19px] text-gray-800 font-medium">
        <NavLink to="/" className={({ isActive }) => linkStyle(isActive)}>
          Home
        </NavLink>
        <a href="#menu" className="hover:text-orange-700 transition-all duration-300">
          Menu
        </a>
        <a href="#contact-us" className="hover:text-orange-700 transition-all duration-300">
          Contact Us
        </a>
      </nav>

      <div className={`${!token ? "mx-4 md:mx-6" : ''} flex text-lg md:text-xl lg:text-2xl items-center gap-3 md:gap-5 text-[16px] md:text-[19px] relative`}>
        <button className="text-gray-700 text-[22px] md:text-[25px] hover:text-orange-700">
          <i className="ri-search-line"></i>
        </button>

        <Link to="/cart" className="relative text-gray-700 text-[22px] md:text-[25px] hover:text-orange-700">
          <i className="ri-shopping-bag-line"></i>
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-orange-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {cartItemCount}
            </span>
          )}
        </Link>

        {token ? (
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <img
                src={profile ? profile : "/images/default.png"}
                alt="user"
                className="w-10 md:w-11 h-10 md:h-11 object-cover rounded-full"
              />
              <span className="text-[15px] md:text-lg text-gray-700">{name}</span>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border z-50 overflow-hidden">
                <Link
                  to="/myorders"
                  className="flex items-center gap-3 px-5 py-3 hover:bg-orange-50 text-gray-700 text-[15px]"
                >
                  <i className="ri-file-list-3-line text-2xl text-orange-600"></i>
                  My Orders
                </Link>

                <label
                  htmlFor="profile-upload"
                  className="flex items-center gap-3 px-5 py-3 hover:bg-orange-50 text-gray-700 text-[15px] cursor-pointer"
                >
                  <i className="ri-image-add-line text-2xl text-green-600"></i>
                  {profile ? "Change Profile" : "Upload Profile"}
                </label>
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  hidden
                  onChange={handleProfileUpload}
                />

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full text-left px-5 py-3 hover:bg-orange-50 text-gray-700 text-[15px]"
                >
                  <i className="ri-logout-box-r-line text-2xl text-red-500"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowLoginInPopUp(true)}
            className="border border-orange-700 text-[15px] sm:text-[17px] text-orange-700 px-5 py-1 rounded-full hover:bg-orange-700 hover:text-white transition"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;