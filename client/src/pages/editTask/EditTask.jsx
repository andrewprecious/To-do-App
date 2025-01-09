import { useState, useEffect } from "react";
import editTaskStyles from "./editTask.module.css";
import dashStyles from "../dashboard/dashboard.module.css";
import taskStyles from "../createTask/createTask.module.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { URL } from "../../App";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const EditTask = () => {
  // const { user } = useAuth();
  // const userId = user ? user._id : null;

  const [formData, setFormData] = useState({
    title: "",
  });

  const { taskId } = useParams(); // Retrieve taskId from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // const { taskId } = useParams();
  // const navigate = useNavigate();

  useEffect(() => {
    if (!taskId) return;

    const fetchTask = async () => {
      try {
        const res = await axios.get(`${URL}/task/task/${taskId}`);
        setFormData({
          title: res.data.title,
        });
      } catch (err) {
        setError("Failed to load post data.");
      }
    };
    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.put(
        `${URL}/task/editTask/${taskId}`,
        formData
      );
      if (response.status === 200) {
        setSuccess("Task updated successfully");
        navigate("/AllTasks");
      }
    } catch (err) {
      setError("Failed to update task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${editTaskStyles.editTask}`}>
      {/* navbar starts */}
      <Navbar />
      <div className={`${editTaskStyles.editTaskContainer}`}>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form className={`${editTaskStyles.form}`} onSubmit={handleSubmit}>
          {/* first div starts */}
          <div className={`${taskStyles.Profile}`}>
            <a href="/">⬅</a>

            <p>Edit Task</p>

            <img src="" className={`${dashStyles.userImg}`} alt="user" />
          </div>
          {/* second div starts */}
          <div className={`${editTaskStyles.toBeDone}`}>
            <h2>New Task</h2>

            <div className={`${editTaskStyles.createNewTask}`}>
              <p>What is to be done?</p>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter New Task Here.."
              />
            </div>

            <div className={`${editTaskStyles.bottomLine}`}></div>
          </div>

          {/* sixth div starts */}
          <div className={`${editTaskStyles.createBtn}`}>
            <button type="submit" disabled={loading}>
              {loading ? "Updating Task..." : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
