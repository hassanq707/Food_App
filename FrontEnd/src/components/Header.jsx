import React from 'react';

const Header = () => {
    return (
        <div className="h-[60vh] w-[90%] lg:w-[85%] md:h-[75vh]  mx-auto rounded-lg relative">
            <div className="absolute inset-0 bg-[url('/images/header_img.jpg')] bg-no-repeat bg-cover bg-center rounded-lg">
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
            </div>      
            <div className="relative h-full flex items-center justify-start px-6 lg:px-16 pt-16">
                <div className="max-w-[85%] md:max-w-[65%] lg:max-w-[55%] text-white">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">Order your favourite food here</h1>
                    <p className="text-sm sm:text-md lg:text-lg mb-6">
                        Discover the best taste in town with our premium quality ingredients, fast delivery,
                        and unbeatable flavor in every bite. Satisfy your cravings now!
                    </p>
                    <a href="#menu">
                        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
                            View Menu
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;
