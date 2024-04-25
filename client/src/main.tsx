import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router.tsx'
import UserProvider from './Context/UserContext.tsx'
import './styles/index.scss';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><UserProvider>
    		<RouterProvider router={router}></RouterProvider>
        </UserProvider>
  </React.StrictMode>,
)