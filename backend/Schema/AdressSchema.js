const mongoose=require('mongoose')

const addressSchema=mongoose.Schema({
    userId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    name:{
        type:String,
        
        
    },
    mobileNo:{
        type:Number,
        require:true
    },
    area:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    }
    
   
})

const address=mongoose.model('address',addressSchema)

module.exports =address;