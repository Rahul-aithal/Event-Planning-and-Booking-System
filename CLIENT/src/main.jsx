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
import AddEvent from './components/AddEvent.jsx'
import EditEvent from './components/UpdateEvent.jsx'
import DeleteEvent from './components/DeleteEvent.jsx'
import DeleteUser from './components/DeleteUser.jsx'
import EditEmail from './components/EditEmail.jsx'
import EditPassword from './components/EditPassword.jsx'
import EditUsername from './components/EditUsername.jsx'
import Profile from './components/Profile.jsx'

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
      path:'SingUp', 
      element:
      (<AuthLayout authentication={false}>
          <SignUp/>
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
      path:'create-event', 
      element:
      (<AuthLayout authentication>
          <AddEvent/>
        </AuthLayout>)
    },
    {
      path:'delete-event', 
      element:
      (<AuthLayout authentication>
          <DeleteEvent/>
        </AuthLayout>)
    },
    {
      path:'edit-event', 
      element:
      (<AuthLayout authentication>
          <EditEvent/>
        </AuthLayout>)
    },
    {
      path:'edit-email', 
      element:
      (<AuthLayout authentication>
         <EditEmail />
        </AuthLayout>)
    },
    {
      path:'edit-username', 
      element:
      (<AuthLayout authentication>
         <EditUsername/>
        </AuthLayout>)
    },
    {
      path:'edit-password', 
      element:
      (<AuthLayout authentication>
         <EditPassword/>
        </AuthLayout>)
    },
    {
      path:'delete-profile', 
      element:
      (<AuthLayout authentication>
          <DeleteUser />
        </AuthLayout>)
    },
    {
      path:'profile', 
      element:
      (<AuthLayout authentication>
          <Profile />
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
