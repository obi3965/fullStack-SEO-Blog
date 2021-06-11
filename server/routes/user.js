const express = require('express')
const {read} = require('../controller/userController')
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware')
const { requireSignin } = require('../middleware/expressJwt')




const router = express.Router()


router.get('/profile', requireSignin, authMiddleware, read)







module.exports = router