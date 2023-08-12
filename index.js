require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const server = express();
const mongoose = require('mongoose');

const productRouter = require('./routes/product')
const userRouter = require('./routes/user')

// connect to mongodb data by using mongoose
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
main().catch(err => console.log("Error connecting to MongoDB:", err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log("Connected to MongoDB");
}

//bodyParser
server.use(express.json());
server.use(morgan('default'));
server.use(express.static('public'));
server.use('/products',productRouter.router);
server.use('/users',userRouter.router);

server.listen(8080, () => {
  console.log('server started');
});