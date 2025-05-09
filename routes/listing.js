const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {IsLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


/*-------------Index  and create listing Route-----------------*/
router.route("/")
.get( wrapAsync(listingController.index))
.post(IsLoggedIn,upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing)); 

/*------------Search Router-------------*/
router.get("/search",wrapAsync(listingController.renderSearchedListing))

/*-------------New Route-----------------*/
router.get("/new",IsLoggedIn, listingController.renderNewForm);


router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(IsLoggedIn,isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete(IsLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

/*-------------Edit Route-----------------*/
router.get("/:id/edit",IsLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

/*------------Category Route-------------*/
router.get("/category/:name",wrapAsync(listingController.renderCategory));

module.exports = router;