const express = require('express');
const Blog = require('../models/blog');


const blogsRouter = require('express').Router()

//Route: Get All Blogs
blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

// TODO
//Route: Post a new Blog
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})


 module.exports = blogsRouter;