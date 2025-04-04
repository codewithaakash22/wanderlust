const { configDotenv } = require("dotenv");
const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req,res)=>{
    let allListings = await Listing.find();
    res.render("Listings/index.ejs",{allListings});
}

module.exports.renderNewForm = (req,res)=>{   
    res.render("Listings/new.ejs");
}

module.exports.createListing = async (req,res,next)=>{
    let Listing1 = new Listing(req.body.listing);

    let cordinates = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send();

    Listing1.owner = req.user._id;
    let url = req.file.path;
    let filename = req.file.filename;
    Listing1.image = {url, filename};
    Listing1.geometry = cordinates.body.features[0].geometry;
    let savedListing = await Listing1.save();
    console.log(savedListing);
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
}

module.exports.showListing = async(req,res)=>{
    let { id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews", populate: "auther"}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/Listings");
    }
    res.render("Listings/show.ejs",{listing});
}

module.exports.renderSearchedListing  = async(req,res)=>{
    let {q} = req.query;
    let allListings = await Listing.find({$or:[{title: {$regex: q, $options: 'i'} },{category: {$regex: q, $options: 'i'}}]});
    if(!allListings){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/Listings");
    }
    res.render("listings/index.ejs",{allListings});
}

module.exports.renderCategory = async(req,res)=>{
    let {name} = req.params;
    let allListings = await Listing.find({category: name});
    res.render("listings/index.ejs",{allListings});
}

module.exports.renderEditForm = async (req,res)=>{
    let { id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/Listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("Listings/edit.ejs",{listing, originalImageUrl});
}

module.exports.updateListing = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file != "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }

    req.flash("success","Listing Updated!");
    console.log(id);
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req,res)=>{
    let { id} = req.params;
     await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}