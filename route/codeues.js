const express=require('express')
const router=express.Router();
const { validate, INDEXS} = require("../models/codeques.model");

router.post("/",async(req,res)=>{
    try{
        const payload = req.body;

        const newindexs = new INDEXS(payload);

        await newindexs.save((err, data)=> {
            if(err){
                return res.status(400).send({message: 'Error while adding new index. Please check the data'});
            }

            res.status(201).send({indexsid: data._id, message: "index has been added successfully." })
        })

    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});

router.get("/allindexs",async(req,res)=>{
    try{
INDEXS.find((err,data)=>{
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
router.get('/:codeID', (req, res) => {
    try{
       INDEXS.findOne({_id: req.params.codeID}, (err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while retrieving an question. Please check the data'})
            }

            res.status(200).send(data);
        })
    }catch(error){
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
});
router.put('/update/:quesID', (req, res) => {
    try{
        INDEXS.findByIdAndUpdate({_id: req.params.quesID}, {$set: req.body}, (err, data) =>{
            if(err){
                return res.status(400).send({message: 'Error while updating an existing question. Please check the data'})
            }

            res.status(201).send({questionid: data._id, message: "question details have been updated."})
        })

    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});

module.exports=router;