import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import  store from './store/store.js'
import AuthLayout from './components/AuthLayout.jsx'
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css';

import Login from './pages/Login/Login.jsx'

import Home from './pages/Home/Home.jsx'
import EventsList from './pages/EventsList/EventsList.jsx'
import App from './App.jsx'
import SignUp from './pages/SignUP/SignUP.jsx'


const router = createBrowserRouter([
  {
  path:'/', 
  element:<App data-bs-theme="dark"/>,
  children: [
    { path:'/', 
      element: <Home /> },
    {
      path:'login', 
      element:
      (<AuthLayout authentication={false}>
        <Login />
        </AuthLayout>)
    },
    {
      path:'events',
       element:
        (<AuthLayout authentication>
          <EventsList />
        </AuthLayout>)
    },
    {
      path:'SignUP', 
      element:
      (<AuthLayout authentication={false}>
          <SignUp/>
        </AuthLayout>)
    },
   
  ]
}

])

    

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
