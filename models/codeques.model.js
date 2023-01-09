const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const Joi = require("joi");
const userSchema=new mongoose.Schema({
    index:{
        type:String,
        require:true,
    },
    ques:{
    type:String,
    require:true,
},
input:{
    type:String,
    require:true,
},
output:{
    type:String,
    require:true,
},
sami:{
    type:String,
    require:true,
},
samo:{
    type:String,
    require:true,
},
answer:{
    type:String
},
mark:{
    type:String
},
answer:{
    type:String,
    default:" "
}

})
const validate = (indexs) => {
	const schema = Joi.object({
        index: Joi.string().required().label("index"),
		ques: Joi.string().required().label("ques"),
        input: Joi.string().required().label("input"),
        output: Joi.string().required().label("output"),
        sami: Joi.string().required().label("sami"),
        samo: Joi.string().required().label("samo"),
        answer: Joi.string().label("answer"),
        mark:Joi.string().label("mark"),
	});
	return schema.validate(indexs);
};
const INDEXS=mongoose.model('indexs',userSchema);

module.exports = {INDEXS, validate };