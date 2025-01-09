import { useEffect, useState } from "react";
import registerStyles from "./register.module.css";
import dashStyles from "../dashboard/dashboard.module.css";
import taskStyles from "../createTask/createTask.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../App";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fname, lname, email, password, cPassword } = registerData;

    if (!fname || !lname || !email || !password || !cPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== cPassword) {
      setError("The confirmation password must match the original password.");
      return;
    }
    try {
      setLoading(true);
      console.log("Registering with data:", registerData);

      const res = await axios.post(`${URL}/account/register`, {
        fname,
        lname,
        email,
        password,
      });
      setSuccess("You're Now Registered");
      setError("");
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message); // Display backend error message
      } else {
        setError(
          "Oops! Something Went Wrong with Your Registration. Please Retry"
        );
      }
      setSuccess(""); // Clear success message if there's an error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${registerStyles.register}`}>
      <div className={`${registerStyles.registerContainer}`}>
        {/* first div starts */}
        <div className={`${taskStyles.Profile}`}>
          <a href="/">⬅</a>

          <p>Register</p>

          <img src="" className={`${dashStyles.userImg}`} alt="user" />
        </div>
        {/* second div starts */}
        <form
          className={`${registerStyles.formContainer}`}
          onSubmit={handleSubmit}
        >
          <div className={`${registerStyles.formGroup}`}>
            <label htmlFor="fname">First name</label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={registerData.fname}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
          </div>

          <div className={`${registerStyles.formGroup}`}>
            <label htmlFor="lname">Last name</label>
            <input
              type="text"
              id="lname"
              name="lname"
              value={registerData.lname}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          </div>

          <div className={`${registerStyles.formGroup}`}>
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

          <div className={`${registerStyles.formGroup}`}>
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

          <div className={`${registerStyles.formGroup}`}>
            <label htmlFor="cPassword">Confirm password</label>
            <input
              type="password"
              id="cPassword"
              name="cPassword"
              value={registerData.cPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
          </div>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <div className={`${registerStyles.registerBtn}`}>
            <button type="submit" disabled={loading}>
              {" "}
              {loading ? "Submitting..." : "Register"}
            </button>
          </div>

          <div className={`${registerStyles.links}`}>
            <p> Already have an account?</p>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
