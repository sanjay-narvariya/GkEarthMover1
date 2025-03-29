import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { postData } from "../../services/FetchNodeAdminServices";

export default function Login() {
  const [mailid, setMailid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();



  // Check if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/home"); // Redirect to home if logged in
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!mailid || !password) {
      setError("Please enter both email and password");
      return;
    }

    setError("");
    try {
      // const response = await postData("adminlogin/chk_admin_login", { mailid, password });
     
      // console.log("API Response:", response); // Debugging: Check the API response in the console

      if( mailid == 'admin' && password == '12345')
        {
        console.log("Login successful. Redirecting...");
        localStorage.setItem("isLoggedIn", "true");
        navigate("/home");
        window.location.reload(); // Refresh the page after navigation

        
      
      } else {
        setError("Invalid login" || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };


  
  return (
    <div className="login-container">
      <motion.div
        className="animated-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      ></motion.div>
      
      <section className="login-section">
        <motion.div 
          className="login-box"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="login-content">
            <div className="logo-container">
              <img src="/Brand-icon.png" alt="logo" className="logo" />
            </div>
            <h5 className="login-title">Sign into your account</h5>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <input
                  type="email"
                  className="input-field"
                  placeholder="Email address"
                  value={mailid}
                  onChange={(e) => setMailid(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  className="input-field"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="button-container">
                <button className="login-button" type="button" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
