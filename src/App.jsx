import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Dashboard } from './pages/Dashboard';
import { LoginPage } from './pages/LoginPage';
import { SignUp } from './pages/SignUp';
import { LandingPage } from './pages/LandingPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Dashboard /> : <LandingPage />} />
      <Route path="/login" element={user ? <Dashboard /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Dashboard /> : <SignUp />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <LoginPage />} />
    </Routes>
  );
}

export default App;