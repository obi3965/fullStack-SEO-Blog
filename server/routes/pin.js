const express = require('express')
const {create, all} = require('../controller/pinController')



const router = express.Router()

router.post('/pin', create)
router.get('/', all)


module.exports = router