const Category = require('../models/category')
const slugify = require('slugify');
const { errorHandler} = require('../helper/dbErrorHandler')
const formidable = require('formidable');
const fs = require('fs');

// exports.create = async (req,res) =>{
//     const { name } = req.body
//     let slug = slugify(name).toLowerCase()
//     try {
//        const category = new Category({ name, slug }) 
//        if(!category){
//         return res.status(400).json({
//             error: errorHandler(err)
//         })
//     }
//        const data = await category.save()
       
//        res.status(200).json(data)
//     } catch (error) {
//         res.status(500).json({error:'category already exist'})
//     }
// }

exports.photo = async (req,res) => {
    const slug = req.params.slug.toLowerCase()

  try {
    const image = await Category.findOne({ slug })
    .select('photo')
    if(!image){
      return res.status(400).json({
        error: errorHandler(err)
    });
    }
    res.set('Content-Type', image.photo.contentType);
    return res.send(image.photo.data)
  } catch (error) {
    res.status(500).json({
      error:'internal server error'
    })
  }
}

exports.create =(req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not be uploaded",
        });
      }
  
      if (!files.photo) {
        return res.status(400).json({
          error: "Image is required",
        });
      }
  
      const { name, slug = slugify(name).toLowerCase() } = fields;
      if(!name || !slug){
          return res.status(400).json({
              error: 'All fields are required',
          });
      }
      let categorySaved = new Category(fields);
      if(!categorySaved){
        return res.status(400).json({
            error: errorHandler(err)
        })
      }
      // 1MB = 1000000
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1MB in size",
        });
      }
  
      categorySaved.photo.data = fs.readFileSync(files.photo.path);
      categorySaved.photo.contentType = files.photo.type;
      // categorySaved.photo.data = undefined;
      // categorySaved.photo.contentType = undefined;
      try {
        await categorySaved.save();
        res.json({
          message: "Product Created Successfully",
          categorySaved,
        });
      } catch (error) {
        res.status(500).json({
            error:'server error'
        });
      }
    });
  };
  

exports.list = async (req,res) =>{
    try {
       const data = await Category.find() 
       if(!data){
        return res.status(400).json({
            error: errorHandler(err)
        })
    }
       res.status(200).json(data)
       
    } catch (error) {
        res.status(500).json({error:'internal server error'})
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

