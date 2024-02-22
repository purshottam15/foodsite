const mongoose=require('mongoose')
const { format } = require('date-fns');

const orderfoodSchame=mongoose.Schema({
    userId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    foodItem:{
        type:Array,
        
        
    },
    modeofpayment:{
        type:String
    },
    status:{
        type:String,
        default:"Pending"

    },
    address:{
        type:Array
    },
    date:{
        type:Date,
        default:Date.now()
        

    }
  
    
   
})

const Orderfood=mongoose.model('Orderfood',orderfoodSchame)

module.exports =Orderfood;