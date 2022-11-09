const express = require("express");
const cors = require("cors");
const userRouter = require("./Routes/User.routes");
const connection = require("./Db/db");
const dotenv = require("dotenv");
const app = express();
app.use(cors());
const PORT = 8080 || process.env.PORT;
dotenv.config();
app.use(express.json());

app.use(express.cookieParser());

// set a cookie
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important!
});

app.use("/user", userRouter);

app.get("/", (req, res) => {
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
