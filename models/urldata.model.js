const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const Joi = require("joi");
const userSchema=new mongoose.Schema({
    Frontend_url:{
    type:String,
    require:true,
},

   Backend_url:{
     type: String,
    require:true,
  
   }
})
const validate = (task) => {
	const schema = Joi.object({
    Question: Joi.string().required().label("Question"),
		Frontend_url: Joi.string().required().label("Frontemd_url"),
		Backend_url: Joi.string().required().label("Backend_url"),
	});
	return schema.validate(task);
};
const ACTIVITY=mongoose.model('task',userSchema);

module.exports = {ACTIVITY, validate };
