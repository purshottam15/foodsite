const express=require('express');
const jwt=require('jsonwebtoken');
require('dotenv').config()
const privatekey=process.env.PRIVATEKEY

const Authentication=async(req,res,next)=>{
    let token = req.header('auth-token');
    if(!token){
        res.json({message:"You are not authorised",status:401});
        return;
    }
    
        let user= await jwt.verify(token,privatekey);

        if(!user){
            res.json({message:"Something wrong"})
        }
        
        req.user=user;
       
    
    next();
   
}
module.exports=Authentication;