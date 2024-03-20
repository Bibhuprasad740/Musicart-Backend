const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// database
const mongoConnect = require("./database/db");

// routes
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

mongoConnect()
  .then((result) => {
    console.log("Connected Successfully");
    app.listen(process.env.PORT);
  })
  .catch((error) => {
    console.log(error);
  });
