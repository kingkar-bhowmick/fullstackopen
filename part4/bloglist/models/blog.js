const mongoose = require('mongoose')  // Import MongoDB ODM library



// Define the shape of blog data in MongoDB
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})


// Create a Model from the Schema
const Blog = mongoose.model('Blog', blogSchema)



module.exports = {Blog}