const mongoose=require('mongoose');
require('dotenv').config()
const url=process.env.URL;
 const mongooseConnect=()=>{
    mongoose.connect(url)
    .then(() => {
        console.log("mongoose connected");
    })
    .catch((error) => {
        console.error("Error connecting to mongoose:", error);
    });
}
module.exports= mongooseConnect