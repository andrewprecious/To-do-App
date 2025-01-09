import React from "react";
import dashStyles from "./dashboard.module.css";
import appStyles from "../../App.module.css";
import Navbar from "../../components/navbar/Navbar";

const Dashboard = () => {
  return (
    <div className={`${dashStyles.dashboard}`}>
      {/* navbar starts */}
      <Navbar />
      <div className={`${dashStyles.dashContainer} ${appStyles.container}`}>
        {/* first div starts */}
        <div className={`${dashStyles.userDetails}`}>
          <div className={`${dashStyles.userName}`}>
            <p>Hi Billgates</p>
            <a href="#">10 tasks pending</a>
          </div>

          <img src="" className={`${dashStyles.userImg}`} alt="user" />
        </div>
        {/* second div starts */}
        <div className={`${dashStyles.search}`}>
          {/* icon */}
          <input type="text" placeholder="Search" />
        </div>
        {/* third div starts */}
        <div className={`${dashStyles.category}`}>
          <p className={`${dashStyles.cateName}`}>Categories</p>

          <div className={`${dashStyles.taskCat} `}>
            {/* tasks category starts*/}
            <div className={`${dashStyles.categoryTask}`}>
              <h3>Mobile App</h3>
              <a href="#">10 Tasks</a>
              <img src="/todoSvg.svg" alt="svg Woman" width="100px" />
            </div>
            {/*  */}
            <div className={`${dashStyles.categoryTask}`}>
              <h3>Website</h3>
              <a href="#">05 Tasks</a>
              <img src="/todoSvg.svg" alt="svg Man" width="100px" />
            </div>
          </div>
        </div>
        {/* last div starts */}
        <div className={`${dashStyles.ongoingTask}`}>
          <div className={`${dashStyles.ongoing}`}>
            <h2>Ongoing Task</h2>
            <a href="#">See all</a>
          </div>
          {/* tasks group */}
          <div className={`${dashStyles.taskGroup}`}>
            <div className={`${dashStyles.ongoingTaskGroup}`}>
              {/* left side starts */}
              <div className={`${dashStyles.left}`}>
                <h3>Wallet design</h3>

                <div className={`${dashStyles.motivate}`}>
                  <p>
                    Keep being motivated 💪🏾
                    <br />
                    You can do this
                  </p>
                </div>

                <div className={`${dashStyles.time}`}>
                  <p>icon</p>
                  <p>2:30 PM - 6:00 PM</p>
                </div>
              </div>
              {/* right side starts */}
              <div className={`${dashStyles.right}`}>
                {/* days the project lasts */}
                <div className={`${dashStyles.days}`}>
                  <a href="#">6d</a>
                </div>

                <div className={`${dashStyles.percent}`}>40</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
