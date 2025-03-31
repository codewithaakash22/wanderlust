const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req,res)=>{
    // console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = await Review(req.body.review);
    listing.reviews.push(newReview);
    newReview.auther = req.user._id;

    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);
    // res.send("Success");
}

module.exports.destroyReview =  async (req,res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);

}