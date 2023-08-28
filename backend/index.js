const express = require('express');
const cors=require("cors");
const { connection } = require('./config/db');
const {userRouter} = require("./routes/user.route")
const {hotelRouter} = require("./routes/hotel.route")
const {roomRouter} = require("./routes/room.route")
const {bookingRouter}=require("./routes/booking.route")


require("dotenv").config()

const app = express();

app.use(express.json()); 
app.use(cors())

app.use("/user",userRouter)
app.use("/hotel",hotelRouter)
app.use("/room",roomRouter)
app.use("/booking",bookingRouter)


app.listen(process.env.PORT, async() => {
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        
    }
    console.log('Server is listening');
});
