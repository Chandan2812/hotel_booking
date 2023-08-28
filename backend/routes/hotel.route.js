const express=require("express")
const {HotelModel}=require("../model/hotel.model")

const hotelRouter=express.Router()

hotelRouter.get('/', async (req, res) => {
    try {
        const hotels = await HotelModel.find(); // Fetch all hotels
        
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching hotels.", error: error.message });
    }
});


hotelRouter.post("/",async (req,res)=>{
    try {
        const {name,city,location,description,rating,image}=req.body
        const hotel=new HotelModel({name,city,location,description,rating,image})
        await hotel.save();
        res.status(201).json({msg:"hotel added",hotel:hotel});
    } catch (error) {
        res.status(500).json({ message: "Error adding hotel.", error: error.message });
    }
})

hotelRouter.get("/search",async(req,res)=>{
    try {
        let {q}=req.query
        const hotels=await HotelModel.find({city:{$regex:q,$options:'i'}})
        res.send(hotels) 
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotel.", error: error.message });
    }
    
})



module.exports={hotelRouter}