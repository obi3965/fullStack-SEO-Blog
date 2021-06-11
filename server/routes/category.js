const express = require('express')


const {create, list, read, remove } = require('../controller/categoryController')
const { adminMiddleware } = require('../middleware/authMiddleware')
const { requireSignin } = require('../middleware/expressJwt')
const { categoryCreateValidator } = require('../validation/category')
const { runValidation } = require('../validation/validate')



const router = express.Router()

router.post('/category',categoryCreateValidator, runValidation, requireSignin,adminMiddleware, create)
router.get('/categories', list)
router.get('/category/:slug', read)
router.delete('/category/:slug',requireSignin, adminMiddleware, remove)



module.exports = router