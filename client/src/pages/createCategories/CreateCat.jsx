import { useState } from "react";
import createCatStyles from "./createCat.module.css";
import dashStyles from "../dashboard/dashboard.module.css";
import taskStyles from "../createTask/createTask.module.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { URL } from "../../App";

const CreateCat = () => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      const res = await axios.post(`${URL}/task/createCategory`, formData);
      setSuccess("Category created successfully");
      setFormData({ name: "" });
    } catch (err) {
      setError("Failed to create category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${createCatStyles.createCat}`}>
      {/* navbar starts */}
      <Navbar />
      <div className={`${createCatStyles.createCatContainer}`}>
        {/* first div starts */}
        <div className={`${taskStyles.Profile}`}>
          <a href="/">⬅</a>

          <p>Create Category</p>

          <img src="" className={`${dashStyles.userImg}`} alt="user" />
        </div>
        {/* second div starts */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form>
          <div className={`${createCatStyles.newCat}`}>
            <label htmlFor="CreateCat">Create Category</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className={`${createCatStyles.createBtn}`}>
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCat;
