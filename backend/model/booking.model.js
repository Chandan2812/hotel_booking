const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    startDate: Date,
    endDate: Date,
    totalPrice: Number,
    bookingDate: { type: Date, default: Date.now },
    status: {type: String,enum:['Confirm','Cancel'], default:'Confirm'},
    paymentStatus: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' }
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports={BookingModel}