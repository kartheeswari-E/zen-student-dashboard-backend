const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const Joi = require("joi");
const userSchema=new mongoose.Schema({
   mark:{
    type:Number,
    require:true,
}
})
const validate = (mark) => {
	const schema = Joi.object({
		mark: Joi.number().required().label("mark"),
	
	});
	return schema.validate(mark);
};
const MARK=mongoose.model('mark',userSchema);

module.exports = {MARK, validate };
