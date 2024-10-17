const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router
  .route("/")
  .get(authenticateUser, getAllReviews)
  .post([authenticateUser, authorizePermissions("user,admin")], createReview);
router
  .route("/:id")
  .get(authenticateUser, getSingleReview)
  .patch([authenticateUser, authorizePermissions("user,admin")], updateReview)
  .delete([authenticateUser, authorizePermissions("user,admin")], deleteReview);
module.exports = router;
