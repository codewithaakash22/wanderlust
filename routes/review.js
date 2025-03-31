const express = require("express");
const router = express.Router({mergeParams:true});
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const {validateReview, IsLoggedIn, isReviewAuther} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

/*------------- Reviews-----------------*/
/*-------------Creating Reviews-----------------*/
router.post("/", IsLoggedIn, validateReview, wrapAsync(reviewController.createReview));

/*-------------Deleting Reviews-----------------*/
router.delete("/:reviewId", IsLoggedIn, isReviewAuther, wrapAsync(reviewController.destroyReview));



module.exports = router;