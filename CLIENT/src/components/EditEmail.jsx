import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import Input from './Input';
import Button from './Button'

function EditEmail() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    newEmail: ''
  });
  const [presentWarningVisible, setPresentWarningVisible] = useState(false);
  const [emptyWarningVisible, setEmptyWarningVisible] = useState(false);
  const dispatch = useDispatch();

  const handChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.name]: e.target.value
      }
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, newEmail } = formData;

    try {
      if (!email || !password || !newEmail) {
        setEmptyWarningVisible(true);
        return;
      } else {
        setEmptyWarningVisible(false);
      }

      const response = await axios.put("http://localhost:8000/api/v1/users/email", formData, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      console.log(response);
      // Set fetched data to state
      if (response.status === 200 && response.data.success) {
        dispatch(logout());
        navigate("/");
      }
      else if (response.status === 404) {
        console.log(response.data?.message);
        setPresentWarningVisible(true);
      
      } 
      else {
        console.log(response.data?.message);
      }
      
    } catch (error) {
      console.log(error); // Set error state if request fails
    }
  };

  return (
    <div className="container mt-5 bg-light border rounded p-4 shadow-sm shadow-lg p-3 mb-5 bg-body-tertiary rounded" style={{ maxWidth: "25rem", maxHeight: "100vh" }}>
      <h2 className="text-center mb-4">Edit Email</h2>
      <form id="register-form" onSubmit={handleSubmit}>

        <Input label="Email" type="email" name="email" value={formData.email} onChange={handChange} />

        <Input label="Password" type="password" name="password" value={formData.password} onChange={handChange} />

        <Input label="New Email" type="email" name="newEmail" value={formData.newEmail} onChange={handChange} />

        <div className="text-center">
          <Button type="submit" classNames='mx-2 my-1'>Change</Button>
        </div>

        {presentWarningVisible && <p className="text-danger mt-2">User not available</p>}
        {emptyWarningVisible && <p className="text-danger mt-2">Please fill in all fields.</p>}
      </form>
    </div>
  );
}

export default EditEmail;
