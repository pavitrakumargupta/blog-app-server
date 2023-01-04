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
     console.log('DB connection suceesfull!');
   }).catch((err)=>{
    console.log("error ocurred",err.message);
   })


const userShema= new mongoose.Schema({
  username: String,
  email: String,
  phnNo:  Number,
  course: String,
  branch: String,
  semester: Number,
  password: String, 
    isAvatarImageset:{
     type:Boolean,
      default:false
    },
    avatarImage:{
      type:String,
      default:"",
    },
    reset:{
      type:String,
      default:""
    }
  })

  // creating and exportins ids 
const user_id=mongoose.model('user',userShema)
module.exports=user_id