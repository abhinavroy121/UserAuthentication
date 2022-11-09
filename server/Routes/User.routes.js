const { Router } = require("express");
// const User = require("../model/User");
const userRouter = Router();
// const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken');

const { signupPost, loginPost } = require("../controller/user.controller");

userRouter.get("/", (req, res) => {
  res.send("User Page");
});

// Route to create a User
userRouter.post("/signup", signupPost);

// Route to login a user
userRouter.post("/login", loginPost);

module.exports = userRouter;
