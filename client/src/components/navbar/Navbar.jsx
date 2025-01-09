import React from "react";
import navStyle from "./navbar.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { logout, user } = useAuth();

  const [isNavopened, setIsNavOpened] = useState(false);

  const toggleNav = () => {
    setIsNavOpened((prevState) => !prevState);
  };
  return (
    <div>
      {/* navbar */}
      <nav className={`${navStyle.navbar}`}>
        <img src="" alt="logo" className={`${navStyle.logoSmall}`} />
        {/* nav left starts */}
        <div className={`${navStyle.navLeft} `}>
          <img src="" alt="logo" className={`${navStyle.logoBig}`} />
          <div
            className={`${navStyle.links} ${
              isNavopened ? navStyle.showLinks : ""
            } `}
          >
            <Link to="/">Home</Link>
            <Link to="/CreateTask">Create Task</Link>
            {/* <Link to="/createCat">Create Category</Link> */}
            <Link to="/allTasks">All tasks</Link>
          </div>
        </div>
        {/* nav right starts */}
        <div className={`${navStyle.navRight} `}>
          <div
            className={`${navStyle.links} ${
              isNavopened ? navStyle.showLinks : ""
            }`}
          >
            {" "}
            {user ? ( // Show logout when user is logged in
              <button onClick={logout} className={`${navStyle.logout}`}>
                Logout
              </button> // Use a button for logout, not a Link
            ) : (
              // Show Register and Login links when user is not logged in
              <>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </div>
        </div>
        {/* hambuger */}
        <div className={`${navStyle.hambuger}`} onClick={toggleNav}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
