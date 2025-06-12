import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="w-[85%] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-14">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">HQ <span className="text-orange-700 px-1"> FOODS</span></h2>
          <p className="text-sm text-gray-300">
            Premium quality food made with love. We serve deliciousness at your doorstep.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:text-yellow-400 cursor-pointer">Home</li>
            <li className="hover:text-yellow-400 cursor-pointer">Menu</li>
            <li className="hover:text-yellow-400 cursor-pointer">Contact</li>
            <li className="hover:text-yellow-400 cursor-pointer">About Us</li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white mb-3">Contact Us</h3>
          <p className="text-sm text-gray-300">Email: qadrihassan25@gmail.com</p>
          <p className="text-sm text-gray-300">Phone: 0315-2714464</p>
          <p className="text-sm text-gray-300">Location: Karachi, Pakistan</p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} HQ FOODS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
