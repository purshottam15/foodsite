const mongoose=require('mongoose')

const foodSchema=mongoose.Schema({
    foodName:{
        type:String,
        require:true
    },
    category:{
        type:String,
        
        
    },
    price:{
        type:Number,
        require:true
    },
    image:{
        type:String,
        require:true
    }
    
   
})

const Food=mongoose.model('Food',foodSchema)

module.exports =Food;