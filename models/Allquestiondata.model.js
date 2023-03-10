const mongoose=require('mongoose')

const contentSchema=new mongoose.Schema({

    recording:{
     type:String,
 },
 
 topic:{
      type: String,
   
   
 },
 
 date:{
     type:String,
   
 },
 content:{
     type:String,
 },
 
 intro:{
      type: String,
     
   
 },
 
 intro1:{
     type:String,
    
   
 },
 intro2:{
     type:String,
   
   
 },
 intro3:{
     type:String,
  
   
 },
 intro4:{
     type:String,
    
   
 },
 intro5:{
     type:String,
  
 },
 intro6:{
     type:String,
   
 },
 Pre_read:{
     type:String,
    
 },
 last:{
     type:String, 
 },
  
 question:{
         type:String
 },
 rec:{
     type:String 
 }
 
 },{
     timestamps:true,
 })


 const validate=(regis) => {
	const schema = Joi.object({
		question: Joi.string().label("question"), 
        answer1: Joi.string().label("answer1"),
        answer2: Joi.string().label("answer2"),
        recording: Joi.string().label("recording"),
        topic: Joi.string().label("topic"),
        date: Joi.string().label("date"),
        content: Joi.string().label("content"),
        intro: Joi.string().label("intro"),
        intro1: Joi.string().label("intro1"),
        intro2: Joi.string().label("intro2"),
        intro3: Joi.string().label("intro3"),
        intro4: Joi.string().label("intro4"),
        intro5: Joi.string().label("intro5"),
        intro6: Joi.string().label("intro6"),
        Pre_read: Joi.string().label("Pre_read"),
        last: Joi.string().label("last"),
	
       });
       
	return schema.validate(regis);
    }      

    const REGIS=mongoose.model('regis',contentSchema);

    module.exports = { REGIS,validate};