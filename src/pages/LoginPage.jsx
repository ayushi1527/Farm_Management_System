import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// This is the main login component
export default function LoginPage() {
  useEffect(()=>{
    console.log('LoginPage mounted')
  },[])
  // State to hold the user's input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State for handling errors and loading status
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Hook to navigate the user after login
  const navigate = useNavigate();

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page from reloading
    setLoading(true);
    setError('');

    try {
      // Send login request to your backend
      const response = await axios.post('/api/users/login', { email, password });
      
      // If successful, save the token and redirect to the dashboard
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); // Redirect to the main app dashboard

    } catch (err) {
      // If login fails, show an error message
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main container to center the form on the page
    // I've used bg-gray-50 to match the background of your landing page
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      
      {/* Link to go back to the homepage */}
      <div className="text-xl font-bold text-teal-700 mb-6">
        <Link to="/">FarmGuard</Link>
      </div>

      {/* The form container with styling that matches your landing page's cards */}
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-colors"
              placeholder="you@farm.com"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Display error message if login fails */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Login Button */}
          {/* The button style matches the "Get Started" button from your landing page */}
          <Link to="/dashboard">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-full transition-colors disabled:bg-teal-400"
          >
            {loading? 'Logging in...' : 'Login'}
          </button>
          </Link>
        </form>

        {/* Link to Sign Up page */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-teal-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}