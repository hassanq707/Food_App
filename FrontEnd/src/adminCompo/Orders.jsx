import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';

const MyOrders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const statusArr = [
    "Food Processing",
    "Out For Delivery",
    "Delivered"
  ];

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/listorders`);
      if (res.data.success) {
        setOrders(res.data.orders.filter(elem => elem.payment === true));
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (e, orderId) => {
    try {
      const res = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: e.target.value
      });
      if (res.data.success) {
        await fetchOrders();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-[95%] mx-auto my-5">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Orders</h2>
      <div className="max-h-[71vh] overflow-y-auto text-gray-800 flex flex-col gap-4">
        {orders.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="h-12 w-12 rounded-full border-4 border-t-orange-700 border-r-transparent border-b-orange-700 border-l-transparent animate-spin"></div>
          </div>
        ) : (
          orders.map((order, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-lg py-4 px-6 bg-white shadow flex flex-col gap-4"
            >
              <div className='flex items-center justify-between flex-wrap gap-4'>
                <div className='w-full sm:w-1/2 flex items-center gap-5'>
                  <img
                    src="/images/parcel.png"
                    alt="parcel"
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div className="text-base font-medium leading-5 break-words">
                    {order.items.map((item, i) => (
                      <span key={i}>
                        {item.name} x{item.quantity}
                        {i !== order.items.length - 1 && ' , '}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-md font-semibold whitespace-nowrap">
                  Rs. {order.amount}
                </div>
                <div className="text-md whitespace-nowrap">
                  Items: {order.items.length}
                </div>

                <div className="flex items-center gap-2">
                  <select
                    onChange={(e) => handleStatusChange(e, order._id)}
                    value={order.status}
                    className="font-semibold text-[15px] px-3 py-1 rounded-full outline-none "
                  >
                    {statusArr.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-sm text-gray-700 bg-gray-100 p-3 rounded">
                <div><span className="font-semibold">Name:</span> {order.address.firstName} {order.address.lastName}</div>
                <div><span className="font-semibold">City:</span> {order.address.city}</div>
                <div><span className="font-semibold">Province:</span> {order.address.province}</div>
                <div><span className="font-semibold">Country:</span> {order.address.country}</div>
                <div><span className="font-semibold">Phone:</span> {order.address.phone}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
