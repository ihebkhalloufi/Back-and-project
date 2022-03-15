const mongoose = require("mongoose")
const Games= new mongoose.Schema({
    Image: {
        type: String,
        required: true
    }, 
    Title: {
        type: String,
        unique: true,
        required: true,
    },
    Date:{
        type:Number,
        required: true
    },
    Description: {
        type: String,
        required: true,
    },
    Trailer:{
        type: String,
        required: true,
    },
    Price:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Game",Games)