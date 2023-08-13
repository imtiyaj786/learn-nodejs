const fs = require("fs");
const mongoose = require("mongoose");
const model = require("../models/Product");
const Product = model.Product;
const ejs = require("ejs");
const path = require("path");

// views   w
// SSR - Server side render
exports.getAllProductsSSR = async (req, res) => {
  const products = await Product.find();
  ejs.renderFile(
    path.resolve(__dirname, "../views/index.ejs"),
    { products: products },
    function (err, str) {
      res.send(str);
    }
  );
};

// using for direct html server side rendring for add.ejs file
exports.getAddForm = async (req, res) => {
  const products = await Product.find();
  ejs.renderFile(
    path.resolve(__dirname, "../views/add.ejs"),
    function (err, str) {
      res.send(str);
    }
  );
};

// Create model
// note - only hen i create a model that We have to Write Instent NeW keyWords.
exports.createProduct = (req, res) => {
  const product = new Product(req.body);
  product.save((err, doc) => {
    console.log({ err, doc });
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(doc);
    }
  });
};

// Get All product from database
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// get single product
exports.getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.json(product);
};

// replace one product
exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Update any product
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Delete any product
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
