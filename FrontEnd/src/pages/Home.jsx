import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { updateCart } from "../store/actions/cartAction";

const RatingStars = ({ rating = 4 }) => {
  const filledStars = Math.floor(rating);
  const totalStars = 5;

  return (
    <div className="flex space-x-1 text-orange-700 text-lg select-none">
      {[...Array(totalStars)].map((_, i) => (
        <i
          key={i}
          className={`${
            i < filledStars ? "ri-star-fill" : "ri-star-line"
          } rounded`}
        ></i>
      ))}
    </div>
  );
};

const Home = ({ url }) => {
  const dispatch = useDispatch();
  const cartCounts = useSelector((state) => state.cart.items);
  const food_list = useSelector((state) => state.foods.data);
  const { token } = useSelector((data) => data.auth);
  const [category, setCategory] = useState("All");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(
      category === "All"
        ? food_list
        : food_list.filter((i) => i.category === category)
    );
  }, [category, food_list]);

  const inc = (id) => dispatch(updateCart(id, "add", token,url));
  const dec = (id) => dispatch(updateCart(id, "remove", token,url));

  return (
    <>
      <Header />
      <Menu category={category} setCategory={setCategory} />
      <div id="menu" className="w-[90%] lg:w-[85%] mx-auto">
        <div className="py-4">
          <h1 className="text-3xl sm:text-4xl  font-bold mb-8  text-gray-800 capitalize">
            {category} Items
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredData.length === 0 ? (
              <div className="col-span-full w-full text-center py-16">
                <div className="inline-block bg-orange-100 text-orange-700 px-6 py-4 rounded-xl shadow-md text-xl font-semibold">
                  😕 No product available in this category.
                </div>
              </div>
            ) : (
              filteredData.map((item) => (
                <div
                  key={item._id}
                  className="rounded-xl shadow hover:shadow-xl hover:scale-[1.03] transition-all duration-300 bg-white flex flex-col"
                >
                  <div className="relative w-full h-72 sm:h-56 md:h-60 rounded-t-xl overflow-hidden">
                    <img
                      src={item.image.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />

                    {!cartCounts[item._id] ? (
                      <button
                        onClick={() => inc(item._id)}
                        className="absolute bottom-2 right-2 w-12 h-12 bg-white text-gray-700 rounded-full flex items-center justify-center shadow text-2xl"
                      >
                        +
                      </button>
                    ) : (
                      <div className="absolute bottom-2 right-2 bg-white rounded-3xl px-2 py-1 shadow flex items-center gap-2">
                        <button
                          onClick={() => dec(item._id)}
                          className="w-9 h-9 bg-red-500 text-md text-white rounded-full flex items-center justify-center hover:bg-red-700"
                        >
                          -
                        </button>
                        <span className="text-gray-800 text-md w-4 text-center">
                          {cartCounts[item._id]}
                        </span>
                        <button
                          onClick={() => inc(item._id)}
                          className="w-9 h-9 bg-green-500 text-md text-white rounded-full flex items-center justify-center hover:bg-green-700"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-black text-lg font-semibold truncate max-w-[80%]">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 flex-grow overflow-hidden line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-orange-700 font-bold text-lg">
                        Rs.{item.price}
                      </p>
                      <RatingStars />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
