import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routes } from "../src/assets/routes"
import './index.css'
import './App.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes}/>
)
