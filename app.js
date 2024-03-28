const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// database
const mongoConnect = require("./database/db");

// routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// auth routes
app.use("/auth", authRoutes);

//productRoutes
app.use("/api", productRoutes);

//cart routes
app.use("/cart", cartRoutes);

mongoConnect()
  .then((result) => {
    console.log("Connected Successfully");
    app.listen(process.env.PORT);
  })
  .catch((error) => {
    console.log(error);
  });
