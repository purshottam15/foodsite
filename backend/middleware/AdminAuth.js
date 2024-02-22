const express=require('express');
const jwt=require('jsonwebtoken');
require('dotenv').config()
const privatekey=process.env.PRIVATEKEY;

const AdminAuth=async(req,res,next)=>{
    let token = req.header('auth-token');
    if(!token){
        res.json({message:"You are not authorised",status:401});
        return;
    }
    
        let user= await jwt.verify(token,privatekey);
       
       if(user.user.email==="puruushottammaheshwari15@gmail.com"){
        next()
       }
       else{
        res.send("Not authorised");
        return;
       }


       
   
   
}
module.exports=AdminAuth;