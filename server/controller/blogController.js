const Blog = require('../models/blog');
const Category = require('../models/category');
const Tag = require('../models/tags');
const User = require('../models/user');
const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const _ = require('lodash');
const { errorHandler } = require('../helper/dbErrorHandler');
const fs = require('fs');





exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
      if (err) {
          return res.status(400).json({
              error: 'Image could not upload'
          });
      }

      const { title, desc,text, categories, tags } = fields;

      if (!title || !title.length) {
          return res.status(400).json({
              error: 'title is required'
          });
      }

      if (!text || text.length < 200) {
          return res.status(400).json({
              error: 'Content is too short'
          });
      }

      if (!categories || categories.length === 0) {
          return res.status(400).json({
              error: 'At least one category is required'
          });
      }

      if (!tags || tags.length === 0) {
          return res.status(400).json({
              error: 'At least one tag is required'
          });
      }

      let blog = new Blog();
      blog.title = title;
      blog.text = text;
      blog.slug = slugify(title).toLowerCase();
      blog.mtitle = `${title} | ${process.env.APP_NAME}`;
      blog.desc = desc;
      blog.postedBy = req.user._id;
      // categories and tags
      let arrayOfCategories = categories && categories.split(',');
      let arrayOfTags = tags && tags.split(',');

      if (files.photo) {
          if (files.photo.size > 10000000) {
              return res.status(400).json({
                  error: 'Image should be less then 1mb in size'
              });
          }
          blog.photo.data = fs.readFileSync(files.photo.path);
          blog.photo.contentType = files.photo.type;
      }

      blog.save((err, result) => {
          if (err) {
              return res.status(400).json({
                  error: errorHandler(err)
              });
          }
          // res.json(result);
          Blog.findByIdAndUpdate(result._id, { $push: { categories: arrayOfCategories } }, { new: true }).exec(
              (err, result) => {
                  if (err) {
                      return res.status(400).json({
                          error: errorHandler(err)
                      });
                  } else {
                      Blog.findByIdAndUpdate(result._id, { $push: { tags: arrayOfTags } }, { new: true }).exec(
                          (err, result) => {
                              if (err) {
                                  return res.status(400).json({
                                      error: errorHandler(err)
                                  });
                              } else {
                                  res.json(result);
                              }
                          }
                      );
                  }
              }
          );
      });
  });
};


 

  exports.list = async (req,res) => {
      try {
          const blogs = await Blog.find({})
          .populate('categories' , '_id name slug')
          .populate('tags', '_id name slug')
          .populate('postedBy','_id name username')
          .select('_id title photo slug text desc categories tags postedBy createdAt updatedAt')

          if(!blogs){
              return res.status(400).json({
                  error: errorHandler(err)
              })
          }
          res.status(200).json(blogs)
      } catch (error) {
        return res.status(500).json({
            error: 'internal server error'
        })
      }
  }


  exports.listAllBlogsCategoriesTags = async (req,res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 10
    let skip = req.body.skip ? parseInt(req.body.skip) : 0

    let blogs 
    let categories 
    let tags 

    try {
      const blog = await Blog.find({})
       .populate('categories' , '_id name slug')
          .populate('tags', '_id name slug')
          .populate('postedBy','_id name username')
          .sort({ CreatedAt: -1})
          .skip(skip)
          .limit(limit)
          .select('_id title slug text desc categories tags postedBy createdAt updatedAt')
    
          if(!blog){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        blogs = blog

        //get all categories
         const catData = await Category.find({})
         if(!catData){
          return res.status(400).json({
            error: errorHandler(err)
        })
         }
         categories = catData

         //get all Tags
         const tagData = await Tag.find({})
         if(!tagData){
          return res.status(400).json({
            error: errorHandler(err)
        })
         }
         tags = tagData

         //return all categories, tags, blogs
         res.json({blogs, categories, tags, size: blogs.length})
        } catch (error) {
          return res.status(500).json({
            error: 'internal server error'
        })
    }
  }


  exports.read = async (req,res) => {

    const slug = req.params.slug.toLowerCase()
    try {
      const data = await Blog.find({ slug })
      .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title body slug mtitle mdesc categories tags postedBy createdAt updatedAt')
    
        if(!data){
          return res.json({
            error: errorHandler(err)
        });
        }
        res.status(200).json(data)
      } catch (error) {
         res.status(500).json({
          error: 'internal server error'
      })
    }
  }



  exports.remove = async (req,res) => {

    const slug = req.params.slug.toLowerCase()
    try {
      const data = await Blog.findOneAndRemove({ slug })
        if(!data){
          return res.json({
            error: errorHandler(err)
        });
        }
        res.status(200).json({
          message: 'blog is deleted'
        })
      } catch (error) {
         res.status(500).json({
          error: 'internal server error'
      })
    }
  }



  exports.update = (req, res) => {
    const slug = req.params.slug.toLowerCase();

    Blog.findOne({ slug }).exec((err, oldBlog) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        let form = new formidable.IncomingForm();
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not upload'
                });
            }

            let slugBeforeMerge = oldBlog.slug;
            oldBlog = _.merge(oldBlog, fields);
            oldBlog.slug = slugBeforeMerge;

            const { body, desc, categories, tags } = fields;

            if (body) {
                oldBlog.excerpt = excerpt;
                oldBlog.desc = body;
            }

            if (categories) {
                oldBlog.categories = categories.split(',');
            }

            if (tags) {
                oldBlog.tags = tags.split(',');
            }

            if (files.photo) {
                if (files.photo.size > 10000000) {
                    return res.status(400).json({
                        error: 'Image should be less then 1mb in size'
                    });
                }
                oldBlog.photo.data = fs.readFileSync(files.photo.path);
                oldBlog.photo.contentType = files.photo.type;
            }

            oldBlog.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                // result.photo = undefined;
                res.json(result);
            });
        });
    });
};


exports.photo = async (req,res) => {
  const slug = req.params.slug.toLowerCase()

  try {
    const image = await Blog.findOne({ slug })
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