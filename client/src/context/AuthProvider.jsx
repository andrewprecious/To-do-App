import axios from "axios";
import { URL } from "../App";
import AuthContext from "./AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // load user from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user state if found in localStorage
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      console.log("logi attempt", { email, password }); // Log the request body
      const response = await axios.post(`${URL}/account/login`, {
        email,
        password,
      });

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      setUser(response.data);
      setError(""); // Reset any error
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localstorage
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
