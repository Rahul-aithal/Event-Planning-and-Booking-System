import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
function Login() {

  const [notFound, setNotFound] = useState(false);
  const [unauthenticate, setUnauthenticate] = useState(false);
  const [emptyWarningVisible, setEmptyWarningVisible] = useState(false);
  const navigateTO =useNavigate();
  const handelSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    let data = {};
    formData.forEach((val, key) => (data[key] = val));
    try {
      // const elemetNotFound = [email, password].some((key) => !data[key]);
      // if (elemetNotFound) {
      //   setEmptyWarningVisible(true);
      //   return;
      // }
      const response = await axios.post("http://localhost:8000/api/v1/users/" + 'login', data, {
        headers: {
          'Content-Type': 'application/json'
        }, 
        withCredentials: true 
      });

      console.log(response);
      // Set fetched data to state
      if (response.status === 200) {

        navigateTO("/");
      }
      else if (response.status === 404) {
        setNotFound(true);
      }
      else if (response.status === 403) {
        setUnauthenticate(true);
      }
      else {
        console.log("ERROR");
      }
    } catch (error) {
      console.log(error); // Set error state if request fails
    }
  }


  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light" id="login-box">
      <div className="card p-5 w-100" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <h2 className="text-center text-primary">Login</h2>
        </div>
        <form id="login-form" onSubmit={handelSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" id="email" name="email" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" id="password" name="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        {unauthenticate && <p className="text-danger" id="warning">*Invalid password</p>}
        {notFound && <p className="text-danger" id="warning">*email Not Found</p>}
        {emptyWarningVisible && <p className="text-danger " id="warning">*Every Field is to be filled </p>}
      </div>
    </div>
  );
}

export default Login;
