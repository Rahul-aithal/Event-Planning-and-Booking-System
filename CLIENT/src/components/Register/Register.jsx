import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register() {
  let navigate = useNavigate();
  const [presentWarningVisible, setPresentWarningVisible] = useState(false)
  const [emptyWarningVisible, setEmptyWarningVisible] = useState(false)
 
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    let data = {};
    formData.forEach((val, key) => (data[key] = val));
    try {
      // const elemetNotFound=[email, password, username].some((key) => !data[key] )
      // if(elemetNotFound){
      //   setEmptyWarningVisible(true);
      //   return;
      // }
      const response = await axios.post("http://localhost:8000/api/v1/users/" + 'register', data, {
        headers: {
          'Content-Type': 'application/json'
        },
      })

      console.log(response);
      // Set fetched data to state
      if (response.status === 200 && response.data.success) {

        navigate("/login");
      }
      else if (response.status === 409) {
        setPresentWarningVisible(true);
      }
      else {
        console.log("ERROR");
      }
    } catch (error) {
      console.log(error); // Set error state if request fails
    }
  }


  return (
    <div className="container mt-5 bg-warning-subtle border d-flex flex-column align-items-center justify-content-center p-3 " style={{ maxWidth: "25rem" }}>
      <h2 className="text-center m-4">Register</h2>
      <form id="register-form" onSubmit={handleSubmit}>
        <div className="my-3">
          <label htm="username" className="form-label">Username:</label>
          <input type="text" id="username" name="username" className="form-control" />
        </div>
        <div className="my-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" id="email" name="email" className="form-control" />
        </div>
        <div className="my-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" id="password" name="password" className="form-control" />
        </div>


        <div className="text-center">
          <button type="submit" className="btn btn-primary">Register</button></div>
        {presentWarningVisible && <p className="text-danger " id="warning">*User already present </p>}
        {emptyWarningVisible && <p className="text-danger " id="warning">*Every Field is to be filled </p>}
      </form>
    </div>
  )
}

export default Register