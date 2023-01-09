const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const Joi = require("joi");
const userSchema=new mongoose.Schema({
    Question:{
    type:String
},
Frontend_url:{
    type:String
},

   Backend_url:{
     type: String
  
   }
},{
    timestamps:true,
})
const validate = (stu) => {
	const schema = Joi.object({
		Question: Joi.string().label("Question"),
        Frontend_url: Joi.string().label("Frontemd_url"),
		Backend_url: Joi.string().label("Backend_url"),
	
	});
	return schema.validate(stu);
};
const STUDENT=mongoose.model('stu',userSchema);

module.exports = {STUDENT, validate };