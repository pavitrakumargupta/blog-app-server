const express=require("express")
const cors =require("cors")
const mongoose=require("mongoose")
const userRoutes =require("./routes/userRoutes")

const app=express()
require("dotenv").config();


app.use(cors())
app.use(express.json())
 
app.use("/api/auth",userRoutes)

const DB = process.env.DATABASE
app.get('/', function(req, res){
    res.send('index.js');
  });

app.listen(process.env.PORT ||5000,()=>{
    console.log('server is listening on',process.env.PORT); 
})       