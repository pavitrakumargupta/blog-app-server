const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: "$__dirname/../.env" });
const DB = process.env.DATABASE


mongoose 
   .connect(DB, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   })
   .then(() => {
     console.log('Post db connection suceesfull!');
   }).catch((err)=>{
    console.log("error ocurred",err.message);
   })
 
   const userShema= new mongoose.Schema({
      TypePost: String,
      heading: String,
      subheading: String,
      name: String,
      imageLink :String,
   })
   const Posts=mongoose.model('Post',userShema)
   module.exports=Posts