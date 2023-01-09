const express=require('express')
const router=express.Router();
const { validate, QUESTION} = require("../models/adminquestion");

router.post("/",async(req,res)=>{
    try{
        const payload = req.body;

        const newQuestion = new QUESTION(payload);

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

router.get("/allquestions",async(req,res)=>{
    try{
QUESTION.find((err,data)=>{
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
router.put('/update/:quesID', (req, res) => {
    try{
        QUESTION.findByIdAndUpdate({_id: req.params.quesID}, {$set: req.body}, (err, data) =>{
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


router.delete("/delete/:quesID",async(req,res)=>{
    try{
QUESTION.deleteOne({_id:req.params.quesID},(err,data)=>{
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

router.get('/:empID', (req, res) => {
    try{
        QUESTION.findOne({_id: req.params.empID}, (err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while retrieving an employee. Please check the data'})
            }

            res.status(200).send(data);
        })
    }catch(error){
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
});


module.exports=router;