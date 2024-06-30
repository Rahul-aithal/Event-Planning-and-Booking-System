import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import Input from './Input'
import Button from './Button';

function LoginComponets() {
  const [notFound, setNotFound] = useState(false);
  const [unauthenticate, setUnauthenticate] = useState(false);
  const [emptyWarningVisible, setEmptyWarningVisible] = useState(false);
  const dispatch = useDispatch();
  const navigateTO = useNavigate();
  const [formData, setFormData] = useState({

    email: '',
    password: ''
  })
  const handChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.name]: e.target.value
      }
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData

    try {
      if (!email || !password) {
        setEmptyWarningVisible(true);
        return;
      } else {
        setEmptyWarningVisible(false);
      }


      const response = await axios.post("http://localhost:8000/api/v1/users/login", formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.status === 200) {
        dispatch(login({ userData: response.data.user }));
        navigateTO("/");
      } else if (response.status === 404) {
        setNotFound(true);
      } else if (response.status === 403) {
        setUnauthenticate(true);
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (

    <div className="container ">

      <div className="card p-5 shadow-lg rounded-lg mx-auto mb-4" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4 text-primary">Login</h2>
        <form id="login-form " onSubmit={handleSubmit}>

          <Input label='Email' type='email' value={formData.email} onChange={(e) => handChange(e)} />

          <Input label='Password' type='password' value={formData.password} onChange={(e) => handChange(e)} />
          <Button type="submit">Login</Button>
        </form>
        {unauthenticate && <p className="text-danger mt-2">Invalid password</p>}
        {notFound && <p className="text-danger mt-2">Email not found</p>}
        {emptyWarningVisible && <p className="text-danger mt-2">Please fill in all fields</p>}
      </div>
    </div>

  );
}

export default LoginComponets;
