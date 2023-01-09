const express=require('express')
const router=express.Router();
const { validate, MARK} = require("../models/marks.model");

router.post("/",async(req,res)=>{
    try{
        const payload = req.body;

        const newmark = new MARK(payload);

        await newmark.save((err, data)=> {
            if(err){
                return res.status(400).send({message: 'Error while adding new mark. Please check the data'});
            }

            res.status(201).send({markid: data._id, message: "mark has been added successfully." })
        })

    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});


router.get("/allmark",async(req,res)=>{
    try{
MARK.find((err,data)=>{
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