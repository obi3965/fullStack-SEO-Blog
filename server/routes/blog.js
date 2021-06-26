const express = require('express')
const { create, list, listAllBlogsCategoriesTags, read, remove, update, photo } = require('../controller/blogController')
const { adminMiddleware } = require('../middleware/authMiddleware')
const { requireSignin } = require('../middleware/expressJwt')

const router = express.Router()

router.post('/blog',requireSignin, adminMiddleware, create )
router.get('/blogs', list)
router.post('/blogs-categories-tags', listAllBlogsCategoriesTags);
router.get('/blog/:slug', read);
router.delete('/blog/:slug',requireSignin, adminMiddleware, remove )
router.put('/blog/:slug', requireSignin, adminMiddleware, update);
router.get('/blog/photo/:slug', photo);




module.exports = router