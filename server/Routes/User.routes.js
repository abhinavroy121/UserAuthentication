const { Router } = require("express");
const User = require("../model/User");
const userRouter = Router();
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { signupPost, loginPost } = require("../controller/user.controller");

require("../controller/passport")
userRouter.get("/", (req, res) => {
  res.send("User Page");
});

// Route to create a User
userRouter.post("/signup", signupPost);

// Route to login a user
userRouter.post("/login", loginPost);

// Route for the protected routes

userRouter.get("/protected", passport.authenticate("jwt", {session:false}), (req,res)=> {

//   res.cookie('jwt_token', res.headers. {
//     httpOnly: true,
//     maxAge: 1 * 60 * 60 * 1000 // 1 day
// })

  res.status(200).send({
       success:true,
       user: {
         id: req.user._id,
         name:req.user.name,
         username: req.user.username, 
         email: req.user.email,
         about: req.user.about,
         time: req.user.createdAt
       }
  })
});

module.exports = userRouter;
