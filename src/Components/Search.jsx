import React from 'react'

function Search({restArr, setAllRestArr}) {

    function handleInp(searchedText){
        const searchedRest = restArr.filter(restaurant=>restaurant.info.name.toLowerCase().includes(searchedText.toLowerCase()))
        setAllRestArr(searchedRest)
    }
  return (
    <div>
        
      <input className="border border-gray-300 rounded-md p-2 mt-1 w-100 focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={(e)=>handleInp(e.target.value)} type="text" placeholder='Search...' />
    </div>
  )
}

export default Search
