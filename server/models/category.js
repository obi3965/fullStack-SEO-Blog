const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            max: 32
        },
        photo:{
            data: Buffer,
            contentType:String
        },
        slug: {
            type: String,
            unique: true,
            index: true
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model('Category', categorySchema);