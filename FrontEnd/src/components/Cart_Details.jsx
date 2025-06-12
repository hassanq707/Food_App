import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart_Details = ({ message, url, onSubmit, order = false }) => {
  const cartCount = useSelector((data) => data.cart.items);
  const food_list = useSelector((state) => state.foods.data);
  const { discount } = useSelector((data) => data.user);

  const itemsInCart = food_list.filter(item => cartCount[item._id] > 0);

  const [newSubTotal, setNewSubTotal] = useState(0);

  const subtotal = itemsInCart.reduce(
    (total, item) => total + item.price * cartCount[item._id],
    0
  );

  useEffect(() => {
    if (discount !== 0) {
      const discounted = subtotal - (subtotal * (discount / 100));
      setNewSubTotal(discounted);
    } else {
      setNewSubTotal(subtotal);
    }
  }, [subtotal, discount]);

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Cart Total</h2>
      <div className="flex justify-between mb-3 text-gray-700">
        <span>Subtotal</span>
        <span>Rs. {subtotal}</span>
      </div>
      <div className="flex justify-between mb-3 text-gray-700">
        <span>Delivery Fee</span>
        <span>Rs. 200</span>
      </div>
      <div className="flex justify-between text-xl font-bold text-gray-800 border-t border-gray-300 pt-3">
        <span>Total</span>
        <div>
          {discount !== 0 ? (
            <span>Rs. {Math.round(newSubTotal + 200)}</span>
          ) : null}
          <span className={`${discount !== 0 ? 'line-through ml-2' : ""}`}>
            Rs. {subtotal + 200}
          </span>
        </div>
      </div>
      {!order ? (
        <Link to={`/${url}`}>
          <button className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md text-lg font-semibold">
            Proceed to {message}
          </button>
        </Link>
      ) : (
        <button
          type="submit"
          form="order-form"
          className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md text-lg font-semibold"
          onClick={onSubmit}
        >
          Proceed to {message}
        </button>
      )}
    </div>
  );
};

export default Cart_Details;
