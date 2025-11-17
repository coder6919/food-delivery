import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ApiCalling() {

    const [allRestaurantsArr,setAllRestaurantsArr]=useState([])

    useEffect(()=> {
        const API = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1822888&lng=79.0729793&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
        
       async function calling(){
            let resp = await axios.get(API)
            // console.log(resp.data.data.cards[2].card.card.gridElements.infoWithStyle.restaurants, 'response')
            setAllRestaurantsArr(resp?.data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        }
        calling()
    }, [])

    
  return allRestaurantsArr
}

export default ApiCalling;
