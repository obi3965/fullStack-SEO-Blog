const express = require('express')
const {register, login, logout, hello} = require('../controller/authController')
const { requireSignin } = require('../middleware/expressJwt')
const { runValidation, signupValidate, signinValidator } = require('../validation/validate')



const router = express.Router()

router.post('/register', signupValidate, runValidation, register)
router.post('/login', signinValidator, runValidation, login)
router.get('/logout', logout)


router.get('/hello',requireSignin, hello)




module.exports = router