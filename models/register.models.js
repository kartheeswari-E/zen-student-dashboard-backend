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
  
},
task:[
    {
        day:{
            type:String,
        },
      answer1:{
        type:String,
      }  ,
        answer2:{
          type:String,
        }  
       
      },({timestamps:true})
        

]

},{
    timestamps:true,
})






userSchema.methods.generateAuthToken= function(){
const token=jwt.sign({_id:this._id},process.env.JWT_PRIVATEKEY)
return token;
}
const validates = (duser) => {
	const schema = Joi.object({
		name: Joi.string().required().label("name"),
		email: Joi.string().email().required().label("email"),
		password:passwordComplexity().required().label("password"),
       });

 
	return schema.validate(duser);
};

const DUSER=mongoose.model('duser',userSchema);

module.exports = {DUSER,validates};