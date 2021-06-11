const User = require('../models/user');


exports.authMiddleware = async (req,res, next) =>{
    const authUser = req.user._id
    try {
        const user = await User.findById({_id: authUser})
        if(!user){
            return res.status(400).json({
                error:'user not found '
            })
        }
        req.profile = user
        next()
    } catch (err) {
        res.status(500).json({
             err:'server error'
        })
    }
}


exports.adminMiddleware = async (req,res, next) =>{
    const adminUser = req.user._id
    try {
        const user = await User.findById({_id: adminUser})
        if(!user){
            return res.status(400).json({
                error:'user not found '
            })
        }
        if(user.role !== 1){
            return res.status(400).json({
                error:'admin resources ! access denied '
            })
        }
        req.profile = user
        next()
    } catch (err) {
        res.status(500).json({
             err:'server error'
        })
    }
}