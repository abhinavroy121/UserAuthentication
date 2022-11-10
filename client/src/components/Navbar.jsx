import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token-jwt");

  const handlelogout = () => {                            // function to logout and delete token
    localStorage.removeItem("token-jwt");
    navigate("/login");
  };

  return (
    <div>
      <div className={styles.navbar}>
        <Link to="/login">
          <h3>Login</h3>
        </Link>
        {token ? (
          <h3 onClick={handlelogout}>Logout</h3>
        ) : (
          <Link to="/signup">
            {" "}
            <h3>Signup</h3>
          </Link>
        )}
        <Link to="/">
          <h3>Dashboard</h3>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
