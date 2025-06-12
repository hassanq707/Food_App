import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import axios from 'axios'

const MyOrders = ({url}) => {
  const [orders, setOrders] = useState([])
  const { token } = useSelector(data => data.auth)
  const statusStyles = {
    "Food Processing": {
      dot: "bg-orange-600",
      text: "bg-orange-100 text-orange-700"
    },
    "Out For Delivery": {
      dot: "bg-blue-600",
      text: "bg-blue-100 text-blue-700"
    },
    "Delivered": {
      dot: "bg-green-600",
      text: "bg-green-100 text-green-700"
    }
  }

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/userorders`, {
        headers: { token }
      })
      if (res.data.success) {
        setOrders(res.data.orders)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  return (
    <div className="w-[90%] lg:w-[85%] mx-auto mt-4 mb-14">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800">My Orders</h2>

      <div className="max-h-[60vh] overflow-y-auto text-gray-800 flex flex-col gap-4">
        {orders.slice(0, 3).map((order, idx) => (
          <div
            key={idx}
            className="border border-gray-300 rounded-lg py-4 px-4 bg-white shadow"
          >
            <div className="hidden md:flex items-center justify-between gap-4">
              <div className='w-1/3 flex items-center gap-5'>
                <img
                  src="/images/parcel.png"
                  alt="parcel"
                  className="w-14 h-14 object-cover rounded"
                />

                <div className="w-full break-words text-base font-medium leading-5">
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.name} x{item.quantity}
                      {i !== order.items.length - 1 && ' , '}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-md whitespace-nowrap font-semibold">
                Rs. {order.amount}
              </div>

              <div className="text-md whitespace-nowrap">
                Items: {order.items.length}
              </div>

              <div className="flex w-1/6 items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${statusStyles[order.status]?.dot}`}></div>
                <div className={`${statusStyles[order.status]?.text} font-semibold text-[15px] px-3 py-1 rounded-full whitespace-nowrap`}>
                  {order.status}
                </div>
              </div>
              
              <button
                onClick={fetchOrders}
                className="bg-orange-800 text-sm text-white font-semibold px-3 py-2 rounded-full shadow hover:scale-105 hover:shadow-md transition-transform duration-200"
              >
                Track Order
              </button>
            </div>

            <div className="md:hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                <div className='flex items-center gap-3 min-w-[200px] flex-1'>
                  <img
                    src="/images/parcel.png"
                    alt="parcel"
                    className="w-12 h-12 object-cover rounded"
                  />

                  <div className="break-words text-sm font-medium">
                    {order.items.map((item, i) => (
                      <span key={i}>
                        {item.name} x{item.quantity}
                        {i !== order.items.length - 1 && ' , '}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-sm font-semibold whitespace-nowrap">
                  Rs. {order.amount}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
                <div className="text-sm whitespace-nowrap">
                  Items: {order.items.length}
                </div>

                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${statusStyles[order.status]?.dot}`}></div>
                  <div className={`${statusStyles[order.status]?.text} font-semibold text-xs px-2 py-1 rounded-full whitespace-nowrap`}>
                    {order.status}
                  </div>
                </div>
                
                <button
                  onClick={fetchOrders}
                  className="bg-orange-800 text-xs text-white font-semibold px-3 py-1.5 rounded-full shadow hover:scale-105 hover:shadow-md transition-transform duration-200"
                >
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders