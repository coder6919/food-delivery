import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// UPDATED: Import useSelector to read cart state and removeItem action
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../utils/cartSlice'; // Make sure this path is correct

function RestaurantDetail() {
    const { id } = useParams();
    const [foodItemDetails, setFoodItemDetails] = useState([]);

    useEffect(() => {
        const API = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.99740&lng=79.00110&restaurantId=${id}&submitAction=ENTER`;
        async function calling() {
            try {
                let resp = await axios.get(API);
                // Updated path to be safer, handles cases where this card isn't at index 4
                const itemCards =
                    resp?.data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.find(
                        (c) => c?.card?.card?.itemCards
                    )?.card?.card?.itemCards;
                setFoodItemDetails(itemCards || []);
            } catch (error) {
                console.error("Error fetching menu:", error);
                setFoodItemDetails([]); // Set to empty array on error
            }
        }
        calling();
    }, [id]);

    const dispatch = useDispatch();

    // NEW: Get the entire list of cart items from the Redux store
    const cartItems = useSelector((store) => store.cart.items);

    function handleAddItem(foodItem) {
        dispatch(addItem(foodItem));
    }

    // NEW: Handler for removing an item. We just need to send the ID.
    function handleRemoveItem(itemId) {
        dispatch(removeItem(itemId));
    }

    return (
        <div>
            <h1 className="text-center font-bold text-2xl my-6">
                List of item's available at restaurant
            </h1>
            {foodItemDetails.map((foodItem) => {
                // NEW: For each item, check how many are in the cart
                const itemCount = cartItems.filter(
                    (item) => item.card.info.id === foodItem.card.info.id
                ).length;

                // Use the 'price' if available, otherwise fall back to 'defaultPrice'
                const itemPrice = (foodItem.card.info.price || foodItem.card.info.defaultPrice) / 100;

                return (
                    // NEW: Re-styled card, Swiggy-style
                    <div
                        key={foodItem.card.info.id}
                        className="flex justify-between items-center w-10/12 md:w-3/4 lg:w-1/2 mx-auto mb-6 border-b-2 p-4"
                    >
                        {/* Left Side: Details */}
                        <div className="flex flex-col w-3/4 pr-4">
                            <h1 className="font-bold text-lg text-gray-800">
                                {foodItem.card.info.name}
                            </h1>
                            <h1 className="text-sm font-medium text-gray-700">₹ {itemPrice}</h1>
                            <p className="text-gray-500 text-sm mt-2">
                                {foodItem.card.info.category}
                            </p>
                        </div>

                        {/* Right Side: Image and Buttons */}
                        <div className="w-1/4 flex flex-col items-center relative">
                            <img
                                className="w-32 h-28 rounded-md border object-cover shadow-lg"
                                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${foodItem.card.info.imageId}`}
                                alt={foodItem.card.info.name}
                            />

                            {/* NEW: Conditional Add/Remove Button UI */}
                            {itemCount === 0 ? (
                                // Show "ADD" button if count is 0
                                <button
                                    onClick={() => handleAddItem(foodItem)}
                                    className="absolute -bottom-2 border border-gray-300 bg-white text-green-500 font-bold px-6 py-1 rounded-md shadow-md
                               hover:bg-gray-50 transition-all duration-200"
                                >
                                    ADD
                                </button>
                            ) : (
                                // Show counter if count > 0
                                <div className="absolute -bottom-2 flex items-center bg-white border border-gray-300 rounded-md shadow-md
                                text-lg font-bold">
                                    <button
                                        onClick={() => handleRemoveItem(foodItem.card.info.id)}
                                        className="text-red-500 px-3 py-1 hover:bg-gray-50 rounded-l-md"
                                    >
                                        -
                                    </button>
                                    <span className="text-green-500 px-3 py-1 text-base">
                                        {itemCount}
                                    </span>
                                    <button
                                        onClick={() => handleAddItem(foodItem)}
                                        className="text-green-500 px-3 py-1 hover:bg-gray-50 rounded-r-md"
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default RestaurantDetail;