import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import './Logout.css'



const Logout = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const dark = useSelector(state=>state.themeChanger.dark)

    const handelLogout = async()=>{
      const res= await axios.post("http://localhost:8000/api/v1/users/logout",{},{withCredentials: true})
      
      if(res.data.success && res.status===200){
        navigate('/login');
        dispatch(logout());
            
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken")
    }
    else{
      console.error(res)
    }
    }
  return (
    
    <button type='button'  className={`btn w-100 btn-danger nav-link btn-custom ${!dark&&"text-black"}`} onClick={handelLogout} >
Logout 
    </button>
  )
}

export default Logout