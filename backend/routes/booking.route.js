const express=require('express')
const {BookingModel}=require("../model/booking.model")
const { UserModel } = require('../model/user.model')
const {RoomModel}=require("../model/room.model")

const bookingRouter=express.Router()


bookingRouter.post('/:userId', async (req, res) => {
    const userId = req.params.userId;

    const room = await RoomModel.findById(req.body.roomId);
    if (!room) {
        return res.status(404).json({ message: "Room not found." });
    }

    const overlappingBooking = await BookingModel.findOne({
        room: req.body.roomId,
        status:'Confirm',
        startDate: { $lt: req.body.endDate },
        endDate: { $gt: req.body.startDate }
    });

    if (overlappingBooking) {
        return res.status(400).json({ message: "This room is already booked for the selected dates." });
    }

    const days = (new Date(req.body.endDate) - new Date(req.body.startDate)) / (1000 * 60 * 60 * 24);
    const totalPrice = days * room.pricePerNight;

    const booking = new BookingModel({
        user: userId,
        room: req.body.roomId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        totalPrice: totalPrice
    });

    try {
        await booking.save();
        res.status(201).json({msg:"booking confirmed",booking:booking});
    } catch (error) {
        res.status(400).json({ message: "Error creating the booking.", error: error.message });
    }
});


bookingRouter.get('/:userId', async (req, res) => {
    try {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

        const bookings = await BookingModel.find({ user: userId })
            .populate('room')  
            .exec();

        if (!bookings.length) {
            return res.status(200).json({ message: "No bookings found for this user.", bookings: [] });
        }

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings.", error: error.message });
    }
});


bookingRouter.put('/:bookingId/cancel', async (req, res) => {
    const bookingId = req.params.bookingId;

    try {
        const booking = await BookingModel.findById(bookingId);
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        booking.status = 'Cancel';
        await booking.save();
        
        res.status(200).json({ message: 'Booking status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});


bookingRouter.put('/:bookingId/update-payment', async (req, res) => {
    const { bookingId } = req.params;
    const { paymentStatus } = req.body; 

    try {
        const booking = await BookingModel.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.paymentStatus = paymentStatus;
        await booking.save();

        res.status(200).json({ message: 'Payment status updated successfully',booking:booking });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

bookingRouter.get('/',async (req,res)=>{
    try {
        const bookings = await BookingModel.find()
        .populate('user')
            .populate({
                path: 'room',
                model: 'Room', 
                populate: {
                    path: 'hotelId',
                    model: 'Hotel'
                }
            })
            .exec();
        const confirmed=await BookingModel.find({status:'Confirm'})
        const cancelled=await BookingModel.find({status:'Cancel'})
        
        res.status(200).json({bookings,confirmed,cancelled});
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching booking.", error: error.message });
    }
})


module.exports={bookingRouter}