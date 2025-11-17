import React from 'react';
import { Link } from 'react-router-dom';

function RestaurantCard({ restArr }) {
    return (
        // The map is still here, as per your original structure
        restArr.map((item) => {
            return (
                <Link
                    key={item.info.id} // Key moved to the top-level element
                    to={`/restaurant/${item.info.id}`}
                    // 'group' makes this the parent for hover effects
                    className="block group rounded-xl overflow-hidden shadow-lg 
                     transition-all duration-300 ease-in-out hover:shadow-2xl"
                >
                    {/* 1. Image Container */}
                    <div className="w-full h-48">
                        <img
                            className="w-full h-full object-cover"
                            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`}
                            alt={item.info.name}
                        />
                    </div>

                    {/* 2. Text Content Container */}
                    <div
                        className="p-4 bg-white transition-colors duration-300 
                       ease-in-out group-hover:bg-orange-500" // This div turns orange
                    >
                        {/* Name */}
                        <h1
                            className="font-bold text-lg truncate text-gray-800 
                         group-hover:text-white" // Text turns white
                        >
                            {item.info.name}
                        </h1>

                        {/* Rating and Time */}
                        <div
                            className="flex items-center font-bold text-sm my-2 text-gray-700 
                         group-hover:text-white" // Text turns white
                        >
                            <span>⭐ {item.info.avgRating}</span>
                            <span className="mx-2">•</span>
                            <span>{item.info.sla.slaString}</span>
                        </div>

                        {/* Cuisines */}
                        <p
                            className="text-sm text-gray-600 truncate 
                         group-hover:text-gray-100" // Text turns light gray
                        >
                            {item.info.cuisines.join(', ')}
                        </p>

                        {/* Locality */}
                        <p
                            className="text-sm text-gray-600 truncate mt-1 
                         group-hover:text-gray-100" // Text turns light gray
                        >
                            {item.info.locality}
                        </p>
                    </div>
                </Link>
            );
        })
    );
}

export default RestaurantCard;