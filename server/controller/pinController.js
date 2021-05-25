const Pin = require('../models/pin')



exports.create = async (req,res) =>{
    try {
       const pinSaved = new Pin(req.body) 

       const pin = await pinSaved.save()
       res.status(200).json(pin)
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.all = async (req,res) =>{
    try {
       const pins = await Pin.find() 

       res.status(200).json(pins)
    } catch (error) {
        res.status(500).json(error)
    }
}


