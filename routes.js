const express = require("express");
const router = express.Router();
const productController = require("./controller/products");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo db connected..");
  })
  .catch((err) => {
    console.log(err);
  });

router.get("/", productController.hello);

module.exports = router;
