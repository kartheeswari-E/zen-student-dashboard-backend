const express=require('express')
const router=express.Router();

const{REGIS,validate}=require("../models/Allquestiondata.model");


router.post("/ques",async(req,res)=>{
    try{
        const payload = req.body;

        const newQuestion = new REGIS(payload);

        await newQuestion.save((err, data)=> {
            if(err){
                return res.status(400).send({message: 'Error while adding new question. Please check the data'});
            }

            res.status(201).send({questionid: data._id, message: "Question has been added successfully." })
        })

    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});

router.get("/allquestion",async(req,res)=>{
    try{
REGIS.find((err,data)=>{
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

router.delete("/delete/:quesID",async(req,res)=>{
    try{
REGIS.deleteOne({_id:req.params.quesID},(err,data)=>{
    if(err){
        res.status(400).send({message:"error while deleting data"})
    }
    res.status(200).send({message:`deleted id ${req.params.quesID} successfully`})
})
    }
    catch(error){
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });  
    }
})

router.put('/upd/:quesID', (req, res) => {
    try{
        REGIS.findByIdAndUpdate({_id: req.params.quesID}, {$set: req.body}, (err, data) =>{
            if(err){
                return res.status(400).send({message: 'Error while updating an existing question. Please check the data'})
            }

            res.status(201).send({questionid:data._id, message: "question details have been updated."})
        })

    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});

router.get('/get/:quID', (req, res) => {
    try{
        REGIS.findOne({_id: req.params.quID}, (err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while retrieving an details. Please check the data'})
            }

            res.status(200).send(data);
        })
    }catch(error){
        res.status(500).send({
            message: 'Internal Server Error', 
        })
    }
});

module.exports=router;