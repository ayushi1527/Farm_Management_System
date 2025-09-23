import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// This is the main sign-up component
export default function SignUpPage() {
  // A single state object to hold all form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    farmName: '',
    farmType: 'Poultry Farm', // Default value for the dropdown
    location: '',
    phoneNumber: '',
  });

  // State for handling errors and loading status
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Hook to navigate the user after sign-up
  const navigate = useNavigate();

  // A single function to handle changes for all input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
     ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page from reloading
    setLoading(true);
    setError('');

    try {
      // Send sign-up request to your backend
      const response = await axios.post('/api/users/register', formData);

      // If successful, save the token and redirect to the dashboard
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); // Redirect to the main app dashboard

    } catch (err) {
      // If sign-up fails, show an error message
      const errorMessage = err.response?.data?.message || 'Sign-up failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main container to center the form, matching the landing page background
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12">
      
      {/* Link to go back to the homepage */}
      <div className="text-xl font-bold text-teal-700 mb-6">
        <Link to="/">FarmGuard</Link>
      </div>

      {/* The form container with styling that matches your landing page's cards */}
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* All input fields are grouped here */}
          <InputField label="Full Name" name="fullName" type="text" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} />
          <InputField label="Email Address" name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
          <InputField label="Password" name="password" type="password" placeholder="Create a password" value={formData.password} onChange={handleChange} />
          <InputField label="Farm Name" name="farmName" type="text" placeholder="Enter your farm name" value={formData.farmName} onChange={handleChange} />
          
          {/* Farm Type Dropdown */}
          <div>
            <label htmlFor="farmType" className="block text-gray-700 font-medium mb-2">Farm Type</label>
            <select
              id="farmType"
              name="farmType"
              value={formData.farmType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-colors bg-white"
            >
              <option>Poultry Farm</option>
              <option>Pig Farm</option>
              <option>Both Pig and Poultry</option>
            </select>
          </div>

          <InputField label="Location" name="location" type="text" placeholder="Enter farm location" value={formData.location} onChange={handleChange} />
          <InputField label="Phone Number" name="phoneNumber" type="tel" placeholder="Enter phone number" value={formData.phoneNumber} onChange={handleChange} />

          {/* Display error message if sign-up fails */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
              {error}
            </div>
          )}

          {/* Sign Up Button */}
          <Link to="/dashboard">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-full transition-colors disabled:bg-teal-400"
          >
            {loading? 'Creating Account...' : 'Sign Up'}
          </button>
          </Link>
        </form>

        {/* Link to Login page */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

// A small helper component to avoid repeating code for each input field
const InputField = ({ label, name, type, placeholder, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-colors"
      placeholder={placeholder}
      required
    />
  </div>
);