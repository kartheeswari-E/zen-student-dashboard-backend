const express=require('express')
const router=express.Router();
const { validate, STUDENT} = require("../models/quesandansw.model");

router.post("/",async(req,res)=>{
    try{
        const payload = req.body;

        const newQuestion = new STUDENT(payload);

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

router.get("/allanswer",async(req,res)=>{
    try{
STUDENT.find((err,data)=>{
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
router.put('/update/:answID', (req, res) => {
    try{
        STUDENT.findByIdAndUpdate({_id: req.params.answID}, {$set: req.body}, (err, data) =>{
            if(err){
                return res.status(400).send({message: 'Error while updating an existing answer. Please check the data'})
            }

            res.status(201).send({answerid: data._id, message: "answer details have been updated."})
        })

    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});


router.delete("/delete/:answID",async(req,res)=>{
    try{
STUDENT.deleteOne({_id:req.params.answID},(err,data)=>{
    if(err){
        res.status(400).send({message:"error while deleting data"})
    }
    res.status(200).send({message:`deleted id ${req.params.answID} successfully`})
})
    }
    catch(error){
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });  
    }
})

router.get('/:answID', (req, res) => {
    try{
        STUDENT.findOne({_id: req.params.answID}, (err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while retrieving an answer. Please check the data'})
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