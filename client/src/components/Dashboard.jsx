import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Dashboard.module.css";
import profile from "../assets/profile.webp";
const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState({});                           // catching data from the fetch
  const token = localStorage.getItem("token-jwt");                // storing token from localStorage
  useEffect(() => {
    axios
      .get("https://safe-waters-11227.herokuapp.com/user/protected", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data.user);
        setdata(res.data.user);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");                   
      });
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <p style={{ marginRight: "-500px" }}>{data.time}</p>
        {/* { token?  <p style={{marginRight:"-550px"}}>{data.time[0]}{data.time[1]}{data.time[2]}{data.time[3]} / {data.time[4]}{data.time[5]}</p>: <p>here</p>} */}
        <div className={styles.image}>
          <img src={profile} alt="" />
        </div>
        <div>
          <div>
            <h1>Name: {data.name}</h1>{" "}
          </div>
          <div>
            <h3>username: {data.username}</h3>
          </div>
        </div>
        <div id={styles.email}>
          <p>About: {data.about}</p>
          <p>{data.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
