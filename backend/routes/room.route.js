const express=require("express")
const {RoomModel}=require("../model/room.model")

const roomRouter=express.Router()

roomRouter.get('/:hotelId', async (req, res) => {
    try {
        const hotelId=req.params.hotelId
        const rooms = await RoomModel.find({hotelId:hotelId});
        
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching rooms.", error: error.message });
    }
});


roomRouter.post("/:hotelId",async (req,res)=>{
    try {
        const hotelId=req.params.hotelId
        const {type,pricePerNight,description,image}=req.body
        const room=new RoomModel({hotelId,type,pricePerNight,description,image})
        await room.save();
        res.status(201).json({msg:"room added",room:room});
    } catch (error) {
        res.status(500).json({ message: "Error adding room.", error: error.message });
    }
})


roomRouter.get("/:hotelId/type", async (req, res) => {
    try {
        const hotelId = req.params.hotelId;
        const types = req.query.q.split(",");

        const rooms = await RoomModel.find({ 
            type: { $in: types },
            hotelId: hotelId 
        });
        
        res.send(rooms);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching rooms.", error: error.message });
    }
});



roomRouter.get("/:hotelId/sort",async(req,res)=>{
    try{
        const hotelId=req.params.hotelId
        let {q}=req.query
        let val=q=="l2h"?1:-1
        const hotels=await RoomModel.find({hotelId:hotelId}).sort({pricePerNight:val})
        res.send(hotels)
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching rooms.", error: error.message });
    }
})

module.exports={roomRouter}