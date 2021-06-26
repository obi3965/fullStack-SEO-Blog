const Tag = require('../models/tags')
const slugify = require('slugify')

exports.create = async (req,res) => {
    const {name} = req.body
    const slug = slugify(name).toLowerCase()
    try {
      const tags = new Tag({name, slug}) 
      const tagList = await tags.save()
      res.status(200).json(tagList)
    } catch (error) {
        res.status(500).json({
            error: 'server error'
        })
    }
}


exports.list = async (req,res) => {
    try {
        const list = await Tag.find()
        res.status(200).json(list)
    } catch (error) {
        res.status(500).json({
            error: 'server error'
        })
    
    }
}


exports.read = async (req,res) => {
    const slug = req.params.slug
    try {
        const data = await Tag.findOne({slug})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            error: 'server error'
        })
}
}


exports.remove = async (req,res) => {
    const slug = req.params.slug
    try {
        const data = await Tag.findOneAndDelete({slug})
        res.status(200).json(
            data
            )
    } catch (error) {
        res.status(500).json({
            error: 'server error'
        })
}
}