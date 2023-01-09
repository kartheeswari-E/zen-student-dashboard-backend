const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const userSchema=new mongoose.Schema({
    name:{
    type:String,
    require:true,
},

    email:{
     type: String,
    require:true,
  
},

    password:{
    type:String,
    require:true,
  
}
})
userSchema.methods.generateAuthToken= function(){
const token=jwt.sign({_id:this._id},process.env.JWT_PRIVATEKEY_ADMIN)
return token;
}
const validate = (adminsignup) => {
	const schema = Joi.object({
		name: Joi.string().required().label("name"),
		email: Joi.string().email().required().label("email"),
		password:passwordComplexity().required().label("password"),
	});
	return schema.validate(adminsignup);
};
const ADMIN=mongoose.model('adminsignup',userSchema); 

module.exports = {ADMIN, validate };
