import React from "react";
import editGroupStyles from "./editAllGroupTask.module.css";
import { useState, useEffect } from "react";
import groupStyles from "../groupCreateTask/groupCreateTask.module.css";
import dashStyles from "../dashboard/dashboard.module.css";
import Navbar from "../../components/navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../App";
import { useAuth } from "../../context/AuthContext";

const EditAllGroupTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const taskId = location.pathname.split("/")[2];
  console.log("Task ID:", taskId);

  const [groupTaskData, setGroupTaskData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { loading } = useAuth();

  useEffect(() => {
    if (!taskId) {
      setError("Invalid task ID.");
      return;
    }

    const fetchgroupTaskData = async () => {
      try {
        const response = await axios.get(
          `${URL}/task/singleGroupTask/${taskId}`
        );
        if (response.status === 404) {
          setError("Group Task not found.");
          return;
        }
        setGroupTaskData({
          title: response.data.title,
          startDate: response.data.startDate,
          endDate: response.data.endDate,
          startTime: response.data.startTime,
          endTime: response.data.endTime,
          description: response.data.description,
        });
      } catch (err) {
        setError("Failed to load task data.");
        console.error("Fetch task error:", err);
      }
    };
    fetchgroupTaskData();
  }, [taskId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make PUT request to update the task
      const response = await axios.put(
        `${URL}/task/editGroupTask/${taskId}`,
        taskData
      );
      // Navigate back to the tasks list page or show success message
      alert("Task updated successfully!");
      navigate("/tasks"); // Assuming you want to redirect to the task list
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className={`${editGroupStyles.editGroupTask}`}>
      {/* navbar starts */}
      <Navbar />
      <div className={`${editGroupStyles.editGroupTaskContainer}`}>
        <form onSubmit={handleSubmit}>
          {/* first div starts */}
          <div className={`${groupStyles.Profile}`}>
            <a href="/">⬅</a>

            <p>Edit Group Task</p>

            <img src="" className={`${dashStyles.userImg}`} alt="user" />
          </div>
          {/* second div starts */}
          <div className={`${editGroupStyles.createTaskSec}`}>
            <div className={`${editGroupStyles.newTask}`}>
              <h2>Edit Group Task</h2>
            </div>

            <div className={`${editGroupStyles.taskTitle}`}>
              <p>Task title</p>

              <input
                type="text"
                name="title"
                id="title"
                value={groupTaskData.title}
                onChange={handleChange}
                placeholder="Type your Task title..."
              />

              <div className={`${editGroupStyles.borderBottom}`}></div>
            </div>
          </div>
          {/* third div starts */}
          <div className={`${editGroupStyles.details}`}>
            {/* Task start date */}
            <div className={`${editGroupStyles.taskStuff}`}>
              <p>Icon</p>
              <div className={`${editGroupStyles.contents}`}>
                <p>Start Date</p>
                <input
                  type="date"
                  name="startDate"
                  value={groupTaskData.startDate}
                  onChange={handleChange}
                />
                {/* <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)} 
                  dateFormat="dd MMM yyyy" 
                  className={`${editGroupStyles.dateInput}`} 
                /> */}
              </div>
            </div>
            {/* Task end date */}
            <div className={`${editGroupStyles.taskStuff}`}>
              <p>Icon</p>
              <div className={`${editGroupStyles.contents}`}>
                <p>End Date</p>
                <input
                  type="date"
                  name="endDate"
                  value={groupTaskData.endDate}
                  onChange={handleChange}
                />
                {/* <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)} 
                  dateFormat="dd MMM yyyy" 
                  className={`${editGroupStyles.dateInput}`} 
                /> */}
              </div>
            </div>
            {/* Task start time */}
            <div className={`${editGroupStyles.taskStuff}`}>
              <p>Icon</p>
              <div className={`${editGroupStyles.contents}`}>
                <p>Task Start</p>
                <input
                  type="time"
                  name="startTime"
                  value={groupTaskData.startTime}
                  onChange={handleChange}
                />
                {/* <input
                  type="text"
                    value={startTime}
                    onChange={(e) => handleTimeChange(e, setStartTime)}
                    onBlur={(e) => handleTimeBlur(e, setStartTime)}
                    className={`${editGroupStyles.timeInput}`}
                  placeholder="hh:mm AM/PM"
                /> */}
              </div>
            </div>
            {/* Task end time */}
            <div className={`${editGroupStyles.taskStuff}`}>
              <p>Icon</p>
              <div className={`${editGroupStyles.contents}`}>
                <p>Task End</p>
                <input
                  type="time"
                  name="endTime"
                  value={groupTaskData.endTime}
                  onChange={handleChange}
                />
                {/* <input
                  type="text"
                    value={endTime}
                    onChange={(e) => handleTimeChange(e, setEndTime)}
                    onBlur={(e) => handleTimeBlur(e, setEndTime)}
                    className={`${editGroupStyles.timeInput}`}
                    placeholder="hh:mm AM/PM"
                /> */}
              </div>
            </div>
          </div>
          {/* fourth div starts */}
          <div className={`${editGroupStyles.description}`}>
            <h2>Descriptions</h2>
            <textarea
              name="description"
              value={groupTaskData.description}
              onChange={handleChange}
              className={`${editGroupStyles.describeBox}`}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consectetur minima, quos aliquam inventore voluptatum quae nostrum
              ullam amet aperiam beatae blanditiis labore voluptas iusto
              reiciendis nisi nihil nemo reprehenderit recusandae!
            </textarea>
          </div>
          {/* fifth div starts */}
          <div className={`${groupStyles.btnCreateTask}`}>
            <button ype="submit" disabled={loading}>
              {loading ? "Updating Task..." : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAllGroupTask;
