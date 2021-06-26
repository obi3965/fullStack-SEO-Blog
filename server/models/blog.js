const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            min: 3,
            max: 160,
            required: true
        },
        slug: {
            type: String,
            unique: true,
            index: true
        },
        
        text: {
            type: String,
            required: true,
            min: 200,
            max: 2000000
        },
        desc: {
            type: String,
            required: true,
            min: 200,
            max: 2000000
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        categories: [{ type: ObjectId, ref: 'Category', required: true }],
        tags: [{ type: ObjectId, ref: 'Tag', required: true }],
        postedBy: {
            type: ObjectId,
            ref: 'User'
        }
    },
    { timestamp: true }
)


module.exports = mongoose.model('Blog', blogSchema)