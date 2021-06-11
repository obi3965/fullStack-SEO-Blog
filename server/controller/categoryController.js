const Category = require('../models/category')
const slugify = require('slugify');
const { errorHandler} = require('../helper/dbErrorHandler')

exports.create = async (req,res) =>{
    const { name } = req.body
    let slug = slugify(name).toLowerCase()
    try {
       const category = new Category({ name, slug }) 
       if(!category){
        return res.status(400).json({
            error: errorHandler(err)
        })
    }
       const data = await category.save()
       
       res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:'category already exist'})
    }
}


exports.list = async (req,res) =>{
    try {
       const list = await Category.find() 
       res.status(200).json(list)
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.read = async(req,res) => {
    const slug = req.params.slug.toLowerCase()
    try {
        const readCat = await Category.findOne({slug})
        if(!readCat){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }else{
            res.json({ readCat: readCat });
        }
    } catch (error) {
        res.status(500).json({
            error:'server error'
        })
    }
}



exports.remove = async(req,res) => {
    const slug = req.params.slug.toLowerCase()
    try {
        const removeCat = await Category.findOneAndDelete({slug})
        if(!removeCat){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }else{
            res.json({ removeCat: removeCat });
        }
    } catch (error) {
        res.status(500).json({
            error:'server error'
        })
    }
}

