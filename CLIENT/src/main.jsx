import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import AuthLayout from './components/AuthLayout.jsx'
import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css';
import Layout from './Layout/Layout.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Home from './pages/Home/Home.jsx'
import Events_List from './pages/Events_List/Events_List.jsx'

const router = createBrowserRouter([{
  path:'/', element:<Layout />,
  children: [
    { path:'', 
      element: <Home /> },
    {
      path:'login', 
      element:(
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>)
    },
    {
      path:'events',
       element:
        (<AuthLayout authentication={false}>
          <Events_List />
        </AuthLayout>)
    },
    {
      path:'register', element: (
        <AuthLayout>
          <Register />
        </AuthLayout>)
    }
  ]
}])

    

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
