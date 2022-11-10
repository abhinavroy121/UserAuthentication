const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup  controller  - Post method
const signupPost =async (req, res) => {
    const { username, name, password, email, about } = req.body;
    if (!username || !password || !name || !email) {
      return res.send("Please Enter all the required credentials Properly");
    }
  
    try {
      const userAuth = await new User({ username, name, password, email, about });
      console.log(userAuth);
      const salt = await bcrypt.genSalt(12);
      userAuth.password = await bcrypt.hash(userAuth.password, salt);
  
      userAuth.save((err, success) => {
        if (err)
          return res.send(
            "Error while creating user or Username and email Already exist"
          );
  
        return res.status(201).send({ message: "User Created successfully" });
      });
    } catch (err) {
      return res.send({ message: err.message, cause: "error while signing up" });
    }
  }

  // login controller  - Post method
const loginPost = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(403).send("Enter valid username or password");
  }

  try {
    let userAuth = await User.findOne({ email });
    if (userAuth) {
      let validatepassword = await bcrypt.compare(password, userAuth.password);
      if (validatepassword) {
        let payload = {
          name: userAuth.name,
          username: userAuth.username,
          email: userAuth.email,
          about: userAuth.about,
        };
        let jwtSecretKey = process.env.JWT_SECRET_KEY;

        const token =  jwt.sign(payload, "string", { expiresIn: "1d" });
            
        
      //   res.cookie('jwt_token', token, {
      //     httpOnly: true,
      //     maxAge: 1 * 60 * 60 * 1000 // 1 day
      // })
        return res.status(200).send({ 
          success:true, 
          message: "Login successful",
           token: "Bearer " + token });
      }
      if(!validatepassword){
        return res.status(401).send({
          success:false,
          message: "Invalid password"
        })
      }
    } else {
      return res.send({ message: "user not found" });
    }
  } catch (err) {
    res.status(403).send({ message: err.message, cause: "User doesn't exist" });
  }
};





module.exports = {signupPost, loginPost  };
