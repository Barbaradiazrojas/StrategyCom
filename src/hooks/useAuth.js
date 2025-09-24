import { useState } from 'react';

export const useAuth = () => {
  const [user] = useState({
    id: 'user123',
    name: 'Usuario Demo',
    email: 'demo@strategycom.com'
  });

  return {
    user,
    isAuthenticated: true,
    login: () => {},
    logout: () => {},
    loading: false
  };
};

export default useAuth;
