import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router.tsx'
import UserProvider from './Context/UserContext.tsx'
import './styles/index.scss';
import CartProvider from './Context/CartContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><UserProvider><CartProvider>
    		<RouterProvider router={router}></RouterProvider></CartProvider>
        </UserProvider>
  </React.StrictMode>,
)
