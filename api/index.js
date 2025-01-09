const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const auth_route = require("./routes/auth_route");
const todo_route = require("./routes/todo_route");

const port = 3000;

// env
dotenv.config();

app.use(express.urlencoded({ extended: true }));

// to use json in express
app.use(express.json());

// set up cors
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://todoapp.onrender.com",
  ],

  allowedHeaders: ["Authorization", "Content-Type"],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  optionSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to mongodb successfully");
    app.listen(port, () => {
      console.log(`Actively listening to requests coming from port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//   routes
app.use("/account", auth_route);
app.use("/task", todo_route);
