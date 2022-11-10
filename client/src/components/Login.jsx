import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import style from "../styles/Login.module.css";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { NavLink, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [user, setuser] = useState({});
  const [e, sete] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [flag, setflag] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token-jwt");
    axios
      .get("https://safe-waters-11227.herokuapp.com/user/protected", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, []);

  const handleClose = (event, reason) => {                  // function for snackbar
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = () => {                            // function to catch input values and post
    let payload = {
      email,
      password,
    };
    if (payload.email.length < 1 || payload.password.length < 1) {
      setflag(false);
      sete(true);
      //  console.log(payload.email.length)
    } else if (payload.email.length > 0 && payload.password.length > 0) {
      axios
        .post("https://safe-waters-11227.herokuapp.com/user/login", payload)
        .then((response) => {
          if (response.data.message !== "user not found") {
            setuser(response.data);
            console.log(response.data);
            localStorage.setItem("token-jwt", response.data.token);         // adding token to localStorage
            sete(true);
            setOpen(true);
            setflag(true);
            navigate("/");
          } else {
            sete(false);
          }
        })
        .catch((error) => {
          sete(false);
          setflag(true);
          console.log(error.message);
        });
    }
    //  console.log(payload)
  };

  return (
    <div style={{ width: "100%", backgroundColor: "white" }}>
      {flag ? null : (
        <Alert severity="error">
          This is an error alert — Required all Credentials !
        </Alert>
      )}
      {e ? null : (
        <Alert severity="error">
          This is an error alert — Wrong Credentials !
        </Alert>
      )}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Login Successful. This is a success message!
        </Alert>
      </Snackbar>
      <br />
      <div
        id={style.justforboxshadow}
        style={{ width: "30%", margin: "auto", backgroundColor: "white" }}
      >
        <br />
        <h2>User Login</h2>
        <br />
        <TextField
          margin="normal"
          required
          fullWidth
          name="email"
          label="Email Address"
          onChange={(e) => setemail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <p style={{ textAlign: "start", color: "rgb(0,102,238)" }}>
          Forgot Password?
        </p>
        <Button
          onClick={handleSubmit}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          style={{ backgroundColor: "rgb(0,102,238)" }}
        >
          LOG IN
        </Button>
        <Typography variant="body2" color="text.secondary" align="center">
          {"New User © "}
          <Link color="inherit" href="/signup">
            Sign up
          </Link>
          {""}
          <br />
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>
      <br />
    </div>
  );
};
