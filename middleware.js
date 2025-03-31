const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

module.exports.IsLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to perform this operation.");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        // console.log(req.session.redirectUrl);
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req,res,next)=>{
    let { id} = req.params;
    let listing = await Listing.findById(id);
        if(!listing.owner._id.equals(res.locals.currUser._id)){
            req.flash("error", "You don't have permission to perform this action!");
            return res.redirect(`/listings/${id}`);
        }
        next();
}
module.exports.isReviewAuther = async (req,res,next)=>{
    let { id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
        if(!review.auther.equals(res.locals.currUser._id)){
            req.flash("error", "You are not ther auther of the review!");
            return res.redirect(`/listings/${id}`);
        }
        next();
}

module.exports.validateListing = (req,res,next) => {
    let {err} = listingSchema.validate(req.body);
    if(err){
        let errMsg = err.details.map((el)=>{el.message}).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

module.exports.validateReview = (req,res,next) =>{
    let {err} = reviewSchema.validate(req,res);
    if(err){
        let errMsg = err.details.map((el)=>{el.message}).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};