const mongoose=require('mongoose')

const foodCategory=mongoose.Schema({
   
    category:{
        type:String,
        
        
    }
   
})

const FoodCategory=mongoose.model('FoodCategory',foodCategory)

module.exports =FoodCategory;