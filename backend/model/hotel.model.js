const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    name: String,
    city: String,
    location: String,
    description: String,
    rating: Number,
    image:String
});

const HotelModel = mongoose.model('Hotel', hotelSchema);

module.exports={HotelModel}

