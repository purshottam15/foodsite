const mongoose=require('mongoose')

const Userschema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    location:{
        type:String,
        
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    address:{
        
    }
   
})

const User=mongoose.model('User',Userschema)

module.exports =User;