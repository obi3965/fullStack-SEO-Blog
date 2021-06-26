const express = require('express')


const {create, list, read, remove } = require('../controller/tagsController')
const { adminMiddleware } = require('../middleware/authMiddleware')
const { requireSignin } = require('../middleware/expressJwt')
const { createTagValidator } = require('../validation/tags')
const { runValidation } = require('../validation/validate')



const router = express.Router()

 router.post('/tag',createTagValidator , runValidation, requireSignin,adminMiddleware, create)
 router.get('/tags', list)
 router.get('/tag/:slug', read)
router.delete('/tag/:slug',requireSignin, adminMiddleware, remove)



module.exports = router