import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const UserRegistration = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', DOB: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  
  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/register`, formData);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have registered successfully!',
      });
    } catch (error) {
      console.error('Registration error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data?.message || 'Something went wrong, please try again.',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="date"
          name="DOB"
          placeholder="Date of Birth"
          value={formData.DOB}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Register
        </button>
        <p className="text-center mt-4">
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
};

export default UserRegistration;
