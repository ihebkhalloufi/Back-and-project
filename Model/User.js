const mongoose = require("mongoose")
const User = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
    }, 
    Email: {
        type: String,
        unique: true,
        required: true,
    },
    Age: {
        type: Number,
        required: true,
        
    },
   
    Password: {
        type: String,
        required: true,
    },
   
})

module.exports = mongoose.model("user", User)