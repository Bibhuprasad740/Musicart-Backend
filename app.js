'use strict'

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
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

//middlewares
const checkAuthorization = require("./middlewares/authorization");

const app = express();

app.use(cors());
app.use(express.json());

// auth routes
app.use("/auth", authRoutes);

//productRoutes
app.use("/products", productRoutes);

//cart routes
app.use("/cart", checkAuthorization, cartRoutes);

//address routes
app.use("/addresses", checkAuthorization, addressRoutes);

//order routes
app.use('/orders',checkAuthorization, orderRoutes);

// feedback routes
app.use("/feedback", checkAuthorization, feedbackRoutes);

app.use('/', (req, res) => {
  res.status(200).send('/ Route does not exist!')
})

mongoConnect()
  .then((result) => {
    console.log("Connected Successfully");
    app.listen(process.env.PORT);
  })
  .catch((error) => {
    console.log(error);
  });
