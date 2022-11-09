import React from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import style from "../styles/Login.module.css"
import { useState } from 'react';
import axios from 'axios'
import {NavLink, useNavigate} from "react-router-dom"

export const Signup = () => {
  const [name,setname] = useState("")
  const [email,setemail] = useState("")
  const [username,setusername] = useState("")
  const [password,setpassword] = useState("")
  const [gender,setgender]= useState("")
  const [e,sete] = useState(true)
  const [open, setOpen] = React.useState(false);
 const navigate = useNavigate()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = ()=>{
    let payload = {
        name,
        email,
        username,
        password,
        gender
    }
    console.log(payload)
    axios.post("http://localhost:8080/user/signup",payload)
    .then((res)=>{
        console.log(res)
        sete(true)
        setOpen(true)
        setTimeout(()=>{
          navigate("/login")
        },1000)
    })
    .catch((error) => {
      sete(false)
     })
  }

  return (
    <div>
          <div style={{width:"100%",backgroundColor:"white"}}>
         {e ? null : <Alert severity="error">This is an error alert — Required All Credentials !</Alert>}
         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          SignUp Successful. Your account has been Created !
        </Alert>
      </Snackbar>
         <br/>
     <div id={style.justforboxshadow} style={{width: '30%',margin:"auto", backgroundColor:"white"}}>
       
        <h2>Create Your Account</h2>

        <TextField 
        onChange={(e)=>setname(e.target.value)}
       margin="normal"
       required
       fullWidth
       name="name"
       label="Name"
     />
     <TextField 
     onChange={(e)=>setemail(e.target.value)}
       margin="normal"
       required
       fullWidth
       name="email"
       label="Email Address"
     />
      <TextField 
      onChange={(e)=>setusername(e.target.value)}
       margin="normal"
       required
       fullWidth
       name="username"
       label="Username"
     />
        <TextField 
        onChange={(e)=>setpassword(e.target.value)}
          margin="normal"
          required
          fullWidth
          id="make-year"
          label="Password"
          name="password"
        />
     <div id={style.radiobuttonhere} >
        <br/>
     <input  type="radio" value="male" name="gender" onChange={()=>{setgender("male")}} /> Male
        <input  type="radio" value="female" name="gender" onChange={()=>{setgender("female")}}/> Female
     </div>
          <Button
          onClick={handleSubmit}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          style={{ backgroundColor: "rgb(0,102,238)" }}
        >
          SIGN UP
        </Button>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Already have an account ? "}
          <Link color="inherit" href="/login">
            Login
          </Link>{""}
          <br/>
          { new Date().getFullYear()}
          {"."}
        </Typography>
     </div>
     <br/>
   
    </div>
    </div>
  )
}