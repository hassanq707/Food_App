import React from "react";

const menuItems = [
  "Salad", "Rolls", "Deserts", "Sandwiches", "Cake", "Pasta", "Noodles", "Drinks"
];

const Menu = ({ category, setCategory }) => {
  return (
    <div className="w-[90%] lg:w-[85%] mx-auto pt-12 pb-7 ">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
        Explore Our <span className="text-orange-700 px-1">Menu</span>
      </h2>
      <p className="text-gray-600 mb-8 max-w-[80%] md:max-w-[65%]">
        Taste the variety—crafted fresh, served fast. Enjoy our delicious menu selections made with quality ingredients, perfect for every craving.
      </p>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setCategory(prev => (prev === item ? "All" : item))}
            className={`flex-shrink-0 px-4 py-2 rounded-md text-sm sm:text-base font-semibold transition duration-200 border-[4px] ${
              category === item
                ? "bg-orange-600 text-white border-orange-600"
                : "bg-white text-orange-600 border-orange-600 hover:bg-orange-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
