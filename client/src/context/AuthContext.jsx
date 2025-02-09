import { createContext, useContext, useEffect, useState } from "react";
import { adminLogin, getUserAdmin } from "../services/Api";
import { jwtDecode } from "jwt-decode"; 
import { io } from 'socket.io-client';
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(VITE_API_BASE_URL);
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);


  const updateUser = (newUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      data: {
        ...prevUser.data,
        ...newUserData,
      },
    }));
  };
  


  // Function to check token expiry
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decodedToken.exp < currentTime; // Token is expired if true
    } catch (error) {
      console.error("Error decoding token!", error);
      return true; // Treat invalid tokens as expired
    }
  };

  // Function to fetch user data
  const fetchUser = async (authToken) => {
    try {
      const userData = await getUserAdmin(authToken);
      setUser(userData); // Update the user state
    } catch (error) {
      console.error("Failed to fetch user:", error);
      logout(); // Log out on failed user fetch
    }
  };


  // On component mount, check for token in localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        if (isTokenExpired(storedToken)) {
          console.warn("Token expired, clearing localStorage.");
          logout();
        } else {
          setToken(storedToken);
          try {
            await fetchUser(storedToken);
          } catch (error) {
            console.error("Failed to fetch user:", error);
            logout();
          }
        }
      }
      setLoading(false);
    };
  
    initializeAuth();
  }, []);  
  

  // Login function
  const login = async (role, email, password) => {
    setLoading(true);
    try {
      const response = await adminLogin({role, email, password });
      const { user, token } = response;
      // Store token and user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setToken(token);
      setUser(user);
      setTimeout(()=>{
        location.reload();
      });
      return response;
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      throw error; // Pass error to the UI for handling
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ socket, updateUser, login, user, token, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
