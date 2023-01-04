const {register,login,setAvatar,forgotPassword,article}=require("../controllers/usercontroller")
const router=require("express").Router() 
 
router.post("/register",register)
router.post("/article",article)
router.post("/login",login)
router.post("/setAvatar/:id",setAvatar)
router.post("/forgotPassword",forgotPassword)
module.exports=router; 