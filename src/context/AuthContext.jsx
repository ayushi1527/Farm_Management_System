import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      // By default, no user is logged in. You can add logic to check localStorage or cookies here.
      setUser(null);
      setLoading(false);
    };
    checkUserStatus();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};