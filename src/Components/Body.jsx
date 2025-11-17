import React, { useEffect, useState } from 'react'
import RestaurantCard from './RestaurantCard';
import ApiCalling from './ApiCalling';
import Search from './Search';

function Body() {
  let restArr = ApiCalling();
  const [allRestArr, setAllRestArr] = useState(restArr)
  const [isClicked, setIsClicked]=useState(false)
  const [isClicked2, setISClicked2]=useState(false)
  useEffect(() => {
    if (restArr && restArr.length) {
      setAllRestArr(restArr)
    }
  }, [restArr])

  function filterTopRatedRest() {
    let ratingFilteredArr = restArr.filter(restaurant => restaurant.info.avgRating > 4.3)
    setAllRestArr(ratingFilteredArr)
    setIsClicked(true);
    setISClicked2(false)
  }
  function resetFilter() {
    setAllRestArr(restArr)
    setISClicked2(true)
    setIsClicked(false)
  }


  return (
    <div>
      <h1 className='font-bold text-3xl text-center my-6'>Restaurants with online food delivery in Nagpur</h1>
      <div className="flex justify-center mb-4">
        <button onClick={() => filterTopRatedRest()} className={`px-4 py-2 mx-2 border rounded-lg font-medium transition-colors duration-200 ease-in-out ${isClicked  ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-500 hover:text-white hover:border-orange-500'}`}>Rating 4.3+</button>
        <button onClick={() => resetFilter()} className={`px-4 py-2 mx-2 border rounded-lg font-medium transition-colors duration-200 ease-in-out  ${isClicked2 ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-500 hover:text-white hover:border-orange-500'}`}>Reset</button>
      </div>
      
      <div className="flex justify-center my-4">
        <Search restArr={restArr} setAllRestArr={setAllRestArr} />
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-10/12 m-auto'>        
        <RestaurantCard restArr={allRestArr} />
      </div>
    </div>
  )
}

export default Body;
