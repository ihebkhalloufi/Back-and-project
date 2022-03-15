const router = require("express").Router()
const Games = require("../Model/Games")
const { verifyToken } = require("../Middlewares/auth")
//GET ALL GAME
router.get("/getallGames",verifyToken, async(req, res) => {
    try {
        const games= await Games.find({})
         if (games) {
             res.status(200).json({status:false, message:"GAMES DATA", data: games})
         } else {
            res.status(200).json({status: false, message:"NOTHING GAMES DATA"})
         }
    } catch(error) {
        res.status(200).json({status: false, message: error ,message:"SOMETHING WRONG !!!"})
    }
})
//ADD GAME
router.post("/Addgame",verifyToken, async(req, res) => {
    try {
        const {Image,Title,Date,Description,Trailer,Price} = req.body
          console.log(req.body)
        const usedtitle = await Games.findOne({Title})
     if (usedtitle) {
            res.status(200).json({status: false, message:"GAME NAME ALREADY EXISTE"})
        } else {
            const game = await Games.create({Image,Title,Date,Description,Trailer,Price})
            res.status(200).json({status: true, message:"GAME ADDED", data: game})
        }
    } catch(error) {
        res.status(200).json({status: false, message: error ,message:"SOMETHING WRONG !!!"})
    }
})
//DELETE GAME
router.delete("/deletegame/:id",verifyToken, async(req, res) => {
    try {
        const {id} = req.params
        const game = await Games.findById(id)

        if (game) {
            await Games.findByIdAndDelete(id)
            res.status(200).json({status: false, message:"USER DELETED",data: user})
        } else {
            res.status(200).json({status: false, message:"NO USER DATA !!!"})
        }
    } catch(error) {
        res.status(200).json({status: false, message: error })
    }
})
//UPDATE OR EDIT GAME
router.put("/Editgame/:id",verifyToken, async(req, res) => {
    try {
        const {Image,Title,Date,Description,Trailer,Price} = req.body
        const {id} = req.params

        const games = await Games.findById(id)
        const usedTitle = await Games.findOne({Title})
        const usedImage = await Games.findOne({Image})
        const usedTrailer = await Games.findOne({Trailer})
        if (games) {
          if (usedTitle) {
                res.status(200).json({status: false, message:"GAME NAME ALREADI EXISTS"})
            } else
            if (usedImage) {
                res.status(200).json({status: false, message:"IMAGE NAME ALREADI EXISTS"})
            } else
            if (usedTrailer) {
                res.status(200).json({status: false, message:"TRAILER LINK ALREADI EXISTS"})
            } else
             {
                const games = await Games.findByIdAndUpdate(id, {Image,Title,Date,Description,Trailer,Price})
                res.status(200).json({status: true, message:"GAME UPDATED", data: games})
            }
        } else {
            res.status(200).json({status: true, message:"SOMETHING WRONG!!!"})
        }
    } catch(error) {
        res.status(500).json({status: false, message: error })
    }
})
module.exports = router;