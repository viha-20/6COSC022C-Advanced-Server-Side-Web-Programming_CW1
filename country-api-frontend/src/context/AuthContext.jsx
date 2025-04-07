import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../api/auth';
import keysService from '../api/keys';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData.data.user);
        
        const keyData = await keysService.getApiKeyInfo();
        if (keyData.data?.apiKey?.key) {
          setApiKey(keyData.data.apiKey.key);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setUser(response.data.user);
    return response;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setApiKey(null);
  };

  const generateApiKey = async () => {
    const response = await keysService.generateApiKey();
    setApiKey(response.data.apiKey);
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        apiKey,
        isLoading,
        login,
        register,
        logout,
        generateApiKey
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);