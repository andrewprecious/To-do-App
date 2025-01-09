import React from "react";
import homeStyles from "./home.module.css";
import appStyles from "../../App.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={`${homeStyles.home} `}>
      <div className={`${homeStyles.homeContainer}  ${appStyles.container}`}>
        {/* top div starts */}
        <div className={`${homeStyles.topDiv}`}>
          {/* first top div */}
          <div className={`${homeStyles.logoDiv}`}>
            <img
              src="/logo.png"
              alt="logo"
              className={`${homeStyles.logoImg}`}
            />
          </div>
          {/* second top div */}
          <h1 className={`${homeStyles.topHeading}`}>
            Manage your team and everything with <span>taskdone</span>
          </h1>
        </div>
        {/* bottom div starts */}
        <div className={`${homeStyles.bottomDiv}`}>
          <div className={`${homeStyles.svgImg}`}>
            <img
              src="/todoSvg.svg"
              alt="svg image"
              height="400px"
              className={`${homeStyles.svg}`}
            />
          </div>

          <p className={`${homeStyles.para1}`}>
            When you're overwhelmed by the amount of work you have on your
            plate, stop and rethink
          </p>

          {/* <div className={`${homeStyles.infoAudio}`}>
            <img src="" alt="audio" />
            <p>textsss</p>
          </div> */}

          {/* button */}
          <div className={`${homeStyles.btn}`}>
            <Link to="/AllTasks" className={`${homeStyles.letsStartBtn}`}>
              Let's Start
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
