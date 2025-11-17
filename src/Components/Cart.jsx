import React from 'react';
// UPDATED: Import all necessary hooks and actions
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, clearCart } from '../utils/cartSlice'; // Make sure path is correct

function Cart() {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  function handleAddItem(foodItem) {
    dispatch(addItem(foodItem));
  }

  function handleRemoveItem(itemId) {
    dispatch(removeItem(itemId));
  }

  // NEW: Create a list of unique items.
  // We use a Map to store one copy of each item, keyed by its ID.
  const uniqueCartItemsMap = new Map();
  cartItems.forEach((item) => {
    uniqueCartItemsMap.set(item.card.info.id, item);
  });
  // Convert the Map's values back into an array
  const uniqueCartItems = Array.from(uniqueCartItemsMap.values());

  return (
    <div className="w-10/12 md:w-3/4 lg:w-1/2 mx-auto my-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-center font-bold text-2xl">Your Cart</h1>
        <button
          onClick={handleClearCart}
          className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg
                     hover:bg-red-600 transition-colors duration-200"
        >
          Clear Cart
        </button>
      </div>

      {/* Check if cart is empty */}
      {uniqueCartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        // Map over the UNIQUE items list
        uniqueCartItems.map((foodItem) => {
          // Get the count for this unique item from the original cartItems list
          const itemCount = cartItems.filter(
            (item) => item.card.info.id === foodItem.card.info.id
          ).length;

          const itemPrice = (foodItem.card.info.price || foodItem.card.info.defaultPrice) / 100;

          return (
            // Re-styled card, identical to the RestaurantDetail page
            <div
              key={foodItem.card.info.id}
              className="flex justify-between items-center mb-6 border-b-2 p-4"
            >
              {/* Left Side: Details */}
              <div className="flex flex-col w-3/4 pr-4">
                <h1 className="font-bold text-lg text-gray-800">
                  {foodItem.card.info.name}
                </h1>
                <h1 className="text-sm font-medium text-gray-700">
                  ₹ {itemPrice} (Total: ₹ {itemPrice * itemCount})
                </h1>
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

                {/* Conditional Add/Remove Button UI */}
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
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Cart;