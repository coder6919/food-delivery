import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Offers from './Components/Offers.jsx'
import Help from './Components/Help.jsx'
import SignIn from './Components/SignIn.jsx'
import Body from './Components/Body.jsx'
import Error from './Components/Error.jsx'
import RestaurantDetail from './Components/RestaurantDetail.jsx'
import RealTimeClock from './Components/RealTimeClock.jsx'
import Cart from './Components/Cart.jsx'
import { Provider } from 'react-redux';
import appStore from './utils/appStore.js';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error/>,
    children:[
      {
        path:'/',
        element:<Body/>
      },
      {
        path: '/offers',
        element: <Offers />
      },
      {
        path: '/help',
        element: <Help />
      },
      {
        path: '/cart',
        element: <Cart/>
      },
      {
        path: '/signIn',
        element: <SignIn />
      },
      {
        path: 'restaurant/:id',
        element: <RestaurantDetail/>
      },
      {
        path: '/clock',
        element: <RealTimeClock/>
      }
    ]
   
 }
])

createRoot(document.getElementById('root')).render(

  <Provider store={appStore}>
    <RouterProvider router={appRouter}></RouterProvider>
  </Provider>

)
