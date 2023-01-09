const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const Joi = require("joi");
const userSchema=new mongoose.Schema({
    Question:{
    type:String,
    require:true,
}
})
const validate = (question) => {
	const schema = Joi.object({
		Question: Joi.string().required().label("Question"),
	
	});
	return schema.validate(question);
};
const QUESTION=mongoose.model('question',userSchema);

module.exports = {QUESTION, validate };
