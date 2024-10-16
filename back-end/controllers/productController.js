const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const createProduct = async (req, res) => {
  req.body.user = req.user.userID;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};
const getAllProducts = (req, res) => {
  res.send("get all products");
};
const getSingleProduct = (req, res) => {
  res.send("get single product");
};
const updateProduct = (req, res) => {
  res.send("update product");
};
const deleteProduct = (req, res) => {
  res.send("delete product");
};
const uploadImage = (req, res) => {
  res.send("upload image");
};
module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
