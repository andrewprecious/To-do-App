import loginStyles from "./login.module.css";
import dashStyles from "../dashboard/dashboard.module.css";
import taskStyles from "../createTask/createTask.module.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login, error, user, loading } = useAuth();
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });
  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = registerData;
    await login(email, password);
  };

  return (
    <div className={`${loginStyles.login}`}>
      <div className={`${loginStyles.loginContainer}`}>
        {/* first div starts */}
        <div className={`${taskStyles.Profile}`}>
          <a href="/">⬅</a>

          <p>Login page</p>

          <img src="" className={`${dashStyles.userImg}`} alt="user" />
        </div>
        {/* second div starts */}
        <form
          className={`${loginStyles.formContainer}`}
          onSubmit={handleSubmit}
        >
          <div className={`${loginStyles.formGroup}`}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className={`${loginStyles.formGroup}`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <div className={`${loginStyles.LoginBtn}`}>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <div className={`${loginStyles.links}`}>
            <p> Don't have an account?</p>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
