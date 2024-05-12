const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const BlogSchema = new Schema({

  title: {
    type: String,
    required: true,
    unique: true
},
description: {
    type: String,
},
tags: {
    type: String,
},
body: {
    type: String
},
author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
},
state: {
     type: String,
     default: 'draft',
     enum: ['draft', 'published']
 },
 read_count: {
    type: Number,
    default: 0
},
reading_time: {
    type: Number,
    tags: [ String ]
},

 
},
{ timestamps: true}
);

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
