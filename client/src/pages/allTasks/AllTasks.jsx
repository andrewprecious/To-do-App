import { useState, useEffect } from "react";
import allTaskStyles from "./allTasks.module.css";
import taskStyles from "../createTask/createTask.module.css";
import dashStyles from "../dashboard/dashboard.module.css";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../../App";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AllTasks = () => {
  const { user } = useAuth();
  const userId = user ? user._id : null;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllTasks = async () => {
      if (!userId) {
        setError("User not logged in");
        return;
      }

      try {
        const res = await axios.get(`${URL}/task/getAllTasks/${userId}`);
        if (res.status === 200) {
          setTasks(res.data); // Update state with the tasks from response
        }
      } catch (err) {
        console.error(
          "Error fetching tasks:",
          err.response?.data || err.message
        );
        setError("Failed to fetch tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllTasks();
  }, [userId]); // Re-fetch tasks when userId changes

  const handleDeleteTask = async (taskId) => {
    const confirmTaskDelete = window.confirm(
      "This task will be permanently deleted. Continue?"
    );
    if (confirmTaskDelete) {
      try {
        // Send DELETE request to the server to delete the task
        await axios.delete(`${URL}/task/deleteTask/${taskId}`);

        // Remove the deleted task from the state to update UI
        // setTasks(tasks.filter((task) => task._id !== taskId));
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );

        alert("Task deletion completed"); // Show success message
      } catch (err) {
        console.error(err);
        alert("We couldn’t delete the task. Please check and try again");
      }
    }
  };

  //
  const handleCheckboxClick = async (taskId) => {
    const confirmTaskDelete = window.confirm(
      "This task will be permanently deleted. Continue?"
    );
    if (confirmTaskDelete) {
      try {
        // Send DELETE request to the server to delete the task
        await axios.delete(`${URL}/task/deleteTask/${taskId}`);

        // Remove the task from the UI by filtering out the deleted task
        // setTasks(tasks.filter((task) => task._id !== taskId));
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );

        alert("Task deletion completed"); // Show success message
      } catch (err) {
        console.error(err);
        alert("We couldn’t delete the task. Please check and try again");
      }
    }
  };

  return (
    <div className={`${allTaskStyles.allTasks}`}>
      {/* Navbar */}
      <Navbar />

      <div className={`${allTaskStyles.allTasksContainer}`}>
        {/* Profile Section */}
        <div className={`${taskStyles.Profile}`}>
          <a href="/">⬅</a>
          <p>All Tasks</p>
          <img src="" className={`${dashStyles.userImg}`} alt="user" />
        </div>

        {/* Greeting Message */}
        <div className={`${allTaskStyles.taskdoneGreet}`}>
          <h2>Taskdone says hi👋🏾</h2>
          <p>Hope you are okay, take it easy🤗</p>
          <p>Remember it's one step at a time</p>
          <p>Keep winning from taskdone 💪🏾😉</p>
        </div>

        {/* Today's Task Section */}
        <div className={`${allTaskStyles.tasks}`}>
          <div className={`${allTaskStyles.allTodayTasks}`}>
            <h2>Today's Task</h2>
            {/* <Link to="#">See all</Link> */}
          </div>
        </div>

        {/* All Tasks Section */}
        <div className={`${allTaskStyles.mainTasks}`}>
          {loading && <p>Loading tasks...</p>}
          {error && <p className={`${allTaskStyles.errorMessage}`}>{error}</p>}

          {/* Task List */}
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task._id} className={`${allTaskStyles.checkBox}`}>
                <div className={`${allTaskStyles.div}`}>
                  <input
                    type="checkbox"
                    name="checkbox"
                    id={`checkbox-${task._id}`}
                    onClick={() => handleCheckboxClick(task._id)}
                  />
                  <Link to="#">{task.title}</Link>
                </div>
                <div className={`${allTaskStyles.infoDiv}`}>
                  <Link to={`/editTask/${task._id}`}>Edit</Link>
                  <button onClick={() => handleDeleteTask(task._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No tasks found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTasks;
