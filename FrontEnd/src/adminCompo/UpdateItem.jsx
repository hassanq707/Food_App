import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";

const UpdateItem = ({ url }) => {
    const item = useLocation().state;
    const [image, setImage] = useState(false);
    const[oldImage,setOldImage] = useState(item.image)
    const categories = ["Salad", "Rolls", "Cake", "Pasta", "Sandwiches", "Deserts", "Noodles", "Drinks"];
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: item.name,
        description: item.description,
        category: item.category,
        price: item.price,
    });

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleChangeFunc = (e) => {
        const { value, name } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmitFunc = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        formData.append('image', image);
        formData.append('oldimage', oldImage.public_id);  
        formData.append('_id', item._id);

        try {
            const response = await axios.post(`${url}/api/food/update`, formData);
            const { success, message } = response.data;
            if (success) {
                setData({
                    name: '',
                    description: '',
                    category: 'Salad',
                    price: '',
                });
                navigate('/admin/all-items')
                setImage(false);
                toast.success(message);
            } else {
                toast.error(message);
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        if (!item) {
            navigate("/");
        }
    }, [item, navigate]);

    if (!item) return null;


    return (
        <div className="w-[95%] sm:w-[85%] lg:w-[65%] bg-white p-4 sm:p-6 mx-auto rounded-md shadow-sm transition-all duration-300">
            <form className="space-y-4" onSubmit={handleSubmitFunc}>
                <section>
                    <label htmlFor="image" className="block text-base sm:text-lg font-medium text-gray-600 mb-2">
                        Upload Image:
                    </label>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                        <label
                            htmlFor="image"
                            className="flex items-center justify-center w-32 h-32  bg-white text-blue-500 rounded-md border border-dashed border-gray-300 cursor-pointer hover:bg-blue-50 transition overflow-hidden"
                        >
                            {image ? (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : item.image ? (
                                <img
                                    src={item.image.url}
                                    alt="preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center text-sm">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="mt-1">Select a file</span>
                                </div>
                            )}

                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>

                        {image && (
                            <div className="mt-2 sm:mt-0 sm:ml-3 text-sm sm:text-base text-gray-600 truncate max-w-full lg:max-w-[250px]">
                                <strong>{image.name}</strong>
                                <span className="text-gray-600 ml-1">
                                    ({Math.round(image.size / 1024)} KB)
                                </span>
                            </div>
                        )}
                    </div>
                </section>

                <div>
                    <label className="block text-base sm:text-lg font-medium text-gray-600 mb-1">
                        Product Name:
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        name="name"
                        onChange={handleChangeFunc}
                        placeholder="Type name"
                        required
                        className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-base sm:text-lg font-medium text-gray-600 mb-1">
                        Product Description:
                    </label>
                    <textarea
                        rows={3}
                        value={data.description}
                        name="description"
                        onChange={handleChangeFunc}
                        placeholder="Write something about the product..."
                        className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                        required
                    ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="w-full sm:w-1/2">
                        <label className="block text-base sm:text-lg font-medium text-gray-600 mb-1">
                            Category:
                        </label>
                        <select
                            name="category"
                            onChange={handleChangeFunc}
                            value={data.category}
                            required
                            className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                        >
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full sm:w-1/2">
                        <label className="block text-base sm:text-lg font-medium text-gray-600 mb-1">
                            Price:
                        </label>
                        <input
                            type="number"
                            value={data.price}
                            name="price"
                            required
                            onChange={handleChangeFunc}
                            placeholder="0"
                            className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2.5 rounded text-sm sm:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateItem;

