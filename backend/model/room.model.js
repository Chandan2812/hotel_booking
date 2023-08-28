const mongoose = require('mongoose');


const roomSchema = mongoose.Schema({
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    type: String,
    pricePerNight: Number,
    description: String,
    image: String
});


const RoomModel = mongoose.model('Room', roomSchema);

module.exports={RoomModel}

