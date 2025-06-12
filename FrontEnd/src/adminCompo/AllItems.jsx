import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";


const AllItems = ({url}) => {
  
const [list, setList] = useState([]);

  useEffect(() => {
    axios.get(`${url}/api/food/list`)
      .then(res => {
        const { data, success } = res.data;
        if (success) {
          setList(data);
        } else {
          console.log(res.data.message);
        }
      })
      .catch(err => console.log(err));
}, []);
  const handleRemoveItem = async (id) => {
    const response = await axios.post(`${url}/api/food/remove`, { id });
    const { success, message } = response.data;

    toast.error(message);
    if (success) {
      toast.success(message);
      setList(list.filter((item) => item._id !== id));
    } else {
    }
  };


  return (
    <div className="w-[95%] lg:w-[90%] mx-auto bg-white my-8">
      {list.length === 0 ? (
        <div className="h-[30vh] flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-xl sm:text-2xl text-center">
            No items found in the menu.
          </p>
        </div>
      ) : (
        <div className="overflow-auto border border-gray-300 rounded-lg mb-6">
          <table className="w-full text-left border-collapse text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr className="text-gray-700">
                <th className="p-2 sm:p-3 border-b border-gray-300">Image</th>
                <th className="p-2 sm:p-3 border-b border-gray-300">Title</th>
                <th className="p-2 sm:p-3 border-b border-gray-300">Category</th>
                <th className="p-2 sm:p-3 border-b border-gray-300">Price</th>
                <th className="p-2 sm:p-3 border-b border-gray-300">Remove</th>
                <th className="p-2 sm:p-3 border-b border-gray-300">Edit</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item._id} className="border-b border-gray-200 text-gray-800">
                  <td className="p-2 sm:p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-2 sm:p-3 max-w-[140px] sm:max-w-[200px] truncate">
                    {item.name}
                  </td>
                  <td className="p-2 sm:p-3">{item.category}</td>
                  <td className="p-2 sm:p-3">{item.price}</td>
                  <td className="px-4 text-red-600 text-2xl">
                    <span
                      onClick={() => handleRemoveItem(item._id)}
                      className="cursor-pointer hover:underline"
                    >
                      &times;
                    </span>
                  </td>
                  <td className="p-2 sm:p-3 text-blue-600 text-sm">
                    <Link 
                      to="/admin/updateitem"  
                      state={ item }
                      className="cursor-pointer hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllItems;
