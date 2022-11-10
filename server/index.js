const express = require("express");
const cors = require("cors");
const userRouter = require("./Routes/User.routes");
const connection = require("./Db/db");
const dotenv = require("dotenv");
const app = express();
const passport = require("passport");
const cookieParser = require('cookie-parser')

app.use(cors());
const PORT =  process.env.PORT || 8080;
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize());
app.use(cookieParser())




app.use("/user", userRouter);

app.get("/", (req, res) => {
    // res.cookie(  "home", "home",{
    
    //   expires : new Date(Date.now() + 100000),
    //   httpOnly : true
    // })
  res.send("<h1>Welcome to User Authentication</h1>");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Listening server on http://localhost:${PORT}`);
  } catch (err) {
    console.log(err, "error listening server");
  }
});
