const mongoose=require('mongoose')

const foodCartSchema=mongoose.Schema({
    userId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    foodName:{
        type:String,
        
        
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    }
    
   
})

const foodCart=mongoose.model('foodCart',foodCartSchema)

module.exports =foodCart;