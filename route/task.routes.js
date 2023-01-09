const express=require('express')
const router=express.Router();
const { validate, ACTIVITY} = require("../models/urldata.model");

router.post("/",async(req,res)=>{
        try {
            const { error } = validate(req.body);
            if (error)
                return res.status(400).send({ message: error.details[0].message });
    
             let user = await new ACTIVITY({ ...req.body}).save();
            res.status(201).send({ message: "user created successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Internal Server Error" });
        }
})

router.get("/allanswer",async(req,res)=>{
    try{
ACTIVITY.find((err,data)=>{
    if(err){
        res.status(400).send({message:"error while retriving"})
    }
    res.status(200).send(data);
})
    }
    catch(error){
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });  
    }

})


module.exports=router;