const router = require("express").Router()
const GamesSlider = require("../Model/GamesSlider")

//GET ALL GAMESLIDER
router.get("/getgameslider", async(req, res) => {
    try {
        const gameslider= await GamesSlider.find({})
         if (gameslider) {
             res.status(200).json({status:false, message:"GAMES DATA", data: gameslider})
         } else {
            res.status(200).json({status: false, message:"NOTHING GAMES DATA"})
         }
    } catch(error) {
        res.status(200).json({status: false, message: error ,message:"SOMETHING WRONG !!!"})
    }
})

  
module.exports = router;