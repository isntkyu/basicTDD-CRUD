const express = require("express");
const productRoutes = require("./routes");
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

const PORT = 5000;

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT);
console.log("running on port ", PORT);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

module.exports = app;
