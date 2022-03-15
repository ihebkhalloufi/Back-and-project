const mongoose = require("mongoose")
const Gameslider= new mongoose.Schema({
    Image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Gameslider",Gameslider)