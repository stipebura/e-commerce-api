const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Review = require("../models/Review");
const Product = require("../models/Product");
const checkPermissions = require("../utils/checkPermissions");
const createReview = async (req, res) => {
  const { product: productID } = req.body;
  const isProductValid = await Product.findOne({ _id: productID });
  if (!isProductValid) {
    throw new CustomError.NotFoundError(`No product with id: ${productID}`);
  }
  const alreadySubmited = await Review.findOne({
    product: productID,
    user: req.user.userID,
  });
  if (alreadySubmited) {
    throw new CustomError.BadRequestError(
      "Review already submited for this product"
    );
  }
  req.body.user = req.user.userID;
  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review });
};
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})
    .populate({
      path: "product",
      select: "name company price",
    })
    .populate({
      path: "user",
      select: "name email",
    });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};
const getSingleReview = async (req, res) => {
  const { id: reviewID } = req.params;
  const review = await Review.findOne({ _id: reviewID });
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewID}`);
  }
  res.status(StatusCodes.OK).json({ review });
};
const updateReview = async (req, res) => {
  const { id: reviewID } = req.params;
  const { rating, title, comment } = req.body;
  const review = await Review.findOne({ _id: reviewID });
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewID}`);
  }
  checkPermissions(req.user, review.user);
  review.rating = rating;
  review.title = title;
  review.comment = comment;
  await review.save();
  res.status(StatusCodes.OK).json({ review });
};
const deleteReview = async (req, res) => {
  const { id: reviewID } = req.params;
  const review = await Review.findOne({ _id: reviewID });
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id : ${reviewID}`);
  }
  checkPermissions(req.user, review.user);
  await review.deleteOne();
  res.status(StatusCodes.OK).json({ review });
};
// to product route
const getSingleProductReviews = async (req, res) => {
  const { id: productID } = req.params;
  const reviews = await Review.find({ product: productID });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};
module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
};
