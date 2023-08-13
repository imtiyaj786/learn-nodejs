require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
// best Ways to choose any path in node
const path = require("path");
const Place = require("./models/Product.js");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
main().catch((err) => console.log("Error connecting to MongoDB:", err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Connected to MongoDB");
}

//bodyParser
server.use(cors());
server.use(express.json());
server.use(morgan("default"));
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/products", productRouter.router);
server.use("/users", userRouter.router);

// here run build folder
// * is used for any directry
// you can directly used your react build file and run react app
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.js"));
});

server.listen(process.env.PORT, () => {
  console.log("server started");
});
