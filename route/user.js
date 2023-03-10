const express=require('express')
const router=express.Router();
const {DUSER,validates} = require("../models/register.models");

const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

router.post("/",async(req,res)=>{
        try {
            const { error } = validates(req.body);
            if (error)
                return res.status(400).send({ message: error.details[0].message });
    
                let user = await DUSER.findOne({ email: req.body.email });
            if (user)
                return res
                    .status(409)
                    .send({ message: "User with given email already Exist!" });
    
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            
            const hashPassword = await bcrypt.hash(req.body.password, salt);
    
            user = await new DUSER({ ...req.body, password: hashPassword }).save();
            res.status(201).send({ message: "user created successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Internal Server Error" });
        }
})




router.post('/upda/:email', (req, res) => {
    try{
      DUSER.findOneAndUpdate({email: req.params.email}, {$push:{task:[req.body]}}, (err, data) =>{
            if(err){
                return res.status(400).send({data:err ,message: 'Error while updating an existing details. Please check the data'})
            }

            res.status(201).send({ message: "details have been updated."})
        })

    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});





router.get("/allanswer",async(req,res)=>{
    try{
DUSER.find((err,data)=>{
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



router.get('/:ID', (req, res) => {
    try{
        DUSER.findOne({email: req.params.ID}, (err, data) => {
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

router.get('/up/:pID', (req, res) => {
    try{
        DUSER.findOne({_id: req.params.pID}, (err, data) => {
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