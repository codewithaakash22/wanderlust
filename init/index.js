const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});

const initDB = async ()=>{
    await Listing.deleteMany({});

    initData.data = initData.data.map((obj)=> ({...obj, owner: "67d6795e1b90f40b987930b2"}));
    await Listing.insertMany(initData.data);

    console.log("Data was initialized");
};

initDB();