const User =require("../model/usermodel");
const Posts=require("../postModel")
const Mail=require("../authentication/mail")
module.exports.register=async (req,res,next)=>{
    try{
        const {username,email,phnNo,course,branch,semester,password,otp}=req.body
        
        const creating_user=async ()=>{
            try {
                // var otp=await Mail(email)
                var reset=await (Mail(email))
                var user= await User.create({ 
                    username, 
                    email,
                    phnNo,
                    course ,
                    branch, 
                    semester,
                    password,
                    reset
                })
                return res.json({status:true})
            } catch (error) {
                res.json({msg:'Invalid email',status:false})
            }
        }
        const deleting_user=async ()=>{ 
            try {
                const result = await User.deleteOne({'email':email}) 
            } catch (error) {
                res.json({msg:'server error',status:false})
            }
        }
        if(otp===''){ 
            const usernameCheck=await User.findOne({username})
            const emailCheck=await User.findOne({email})

            if (usernameCheck){
                if(usernameCheck.password===''){
                    await deleting_user()
                    return await creating_user()
                }
                return res.json({msg:"username already exist",status:false}); 

            }else if(emailCheck){
                if(emailCheck.password===''){
                    await deleting_user()
                    return await creating_user()
                }
                return res.json({msg:"email already exist",status:false});

            }else{   
                return await creating_user()
            }
        }else if(password===''){
            const userr=await User.findOne({email})
            if(otp==userr.reset){
                return res.json({status:true,updated:'otp'})
            }else{return res.json({msg:"Invalid OTP!",status:false});}
        }else if(password!=''){  
            try {
                const user=await User.findOne({email})
                const userData=await User.findByIdAndUpdate(user._id,{
                    password:password,
                })
                return res.json({status:true,updated:'password'})
            } catch (error) {
                console.log(error);
                return res.json({msg:"Please try after 10 min.",status:false})
            } 

        }  
    }catch(ex){
        next(ex)
    }
} 
module.exports.login=async (req,res,next)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(user && user.password===password){
            return res.json({status:true,user})  
        }
        else{ 
            return res.json({
                msg:"please enter correct id and password",status:false});
        }
        
    }catch(ex){
        next(ex)
    }
} 
module.exports.setAvatar=async (req,res,next)=>{
    try{
        const userId =req.params.id
        const avatarImage=req.body.image;
        const userData=await User.findByIdAndUpdate(userId,{
            isAvatarImageset:true,
            avatarImage,
        }) 
        return res.json({
            isSet: await userData.isAvatarImageset,image:userData.avatarImage})
    }catch(ex){
        next(ex)
    }
} 

module.exports.forgotPassword=async (req,res,next)=>{
    try{
        const {email,otp,password}=req.body.detail

        const user=await User.findOne({email})
        if(password!=''){
            try { 
                const userData=await User.findByIdAndUpdate(user._id,{
                    password:password,
                })
                return res.json({status:true});
            } catch (error) {
                console.log(error);
            }  
        }else if(otp!=''){
            if((otp)==user.reset){
                return res.json({status:true});
            }else{
                return res.json({
                  msg:"Invalid OTP",status:false});
            }
        }else{
            if(user){
                var genrated_otp=await (Mail(email))
                const userData=await User. findByIdAndUpdate(user._id,{
                    reset:genrated_otp,
                })
                return res.json({status:true}) 
            }
            return res.json({
                msg:"This email is not registered",status:false});
        } 
    }catch(ex){
        next(ex)
    }
} 
 
module.exports.article=async(req,res,next)=>{
    try {
        const {TypePost,name,imageLink,heading,subheading,operation,_id}=req.body
        console.log(operation)
        if(operation==='delete'){
            const result = await Posts.deleteOne({'_id':_id})
        }else if(operation==='edit'){
            const userData=await Posts.findByIdAndUpdate(_id,{
                TypePost:TypePost,
                heading: heading, 
                subheading:subheading,
                imageLink:imageLink
            })
        }else if(operation==='read'){
            if(TypePost==='all'){
                const userData=await Posts.find()
                return res.json(userData);
            }else if(TypePost==='article'){
                const userData=await Posts.find({TypePost:"article"})
                return res.json(userData);
            }else if(TypePost==='Education'){
                const userData=await Posts.find({TypePost:"Education"})
                return res.json(userData);
            }else if(TypePost==='meeting'){
                const userData=await Posts.find({TypePost:"meeting"})
                return res.json(userData);
            }else if(TypePost==='Job'){
                const userData=await Posts.find({TypePost:"Job"})
                return res.json(userData);
            }  
        }else{
            var post= await Posts.create({ 
                TypePost,
                heading,
                subheading,
                name,
                imageLink
                })
            }
    } catch (error) {
        
    }
}
     