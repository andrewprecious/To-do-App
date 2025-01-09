import { useState } from "react";
import taskStyles from "./createTask.module.css";
import dashStyles from "../dashboard/dashboard.module.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { URL } from "../../App";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CreateTask = () => {
  const { user } = useAuth(); // Access user data from the context
  const userId = user ? user._id : null;

  const [formData, setFormData] = useState({
    title: "",

    // category: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // handling change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the corresponding field (title) in the state
    }));
  };

  // handling submitting of form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if userId exists
    if (!userId) {
      setError("User not logged in");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        `${URL}/task/createTask/${userId}`,
        formData
      );
      console.log(res);
      if (res.status === 200) {
        setSuccess("Task created successfully");
        navigate("/AllTasks");
      }
    } catch (err) {
      console.error("Error creating task:", err.response?.data || err.message); // Log the error response data
      setError("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${taskStyles.createTask}`}>
      {/* navbar starts */}
      <Navbar />
      <div className={`${taskStyles.createContainer}`}>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          {/* first div starts */}
          <div className={`${taskStyles.Profile}`}>
            <a href="/">⬅</a>

            <p>Today's Task</p>

            <img src="" className={`${dashStyles.userImg}`} alt="user" />
          </div>
          {/* second div starts */}
          <div className={`${taskStyles.toBeDone}`}>
            <h2>New Task</h2>

            <div className={`${taskStyles.createNewTask}`}>
              <p>What is to be done?</p>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter New Task Here.."
              />
            </div>

            <div className={`${taskStyles.bottomLine}`}></div>
          </div>

          {/* sixth div starts */}
          <div className={`${taskStyles.createBtn}`}>
            <button className={`${taskStyles.createTaskBtn}`}>
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
