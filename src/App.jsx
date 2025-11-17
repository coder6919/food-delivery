import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Body from './Components/Body'
import { Outlet } from 'react-router-dom'


function App() {
  return (
    <div>
      <Header/>
      {/* <Body/> */}
      <Outlet/>
      <Footer/>
      
    </div>
  )
}

export default App
