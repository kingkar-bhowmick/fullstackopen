const express = require('express')      // Import Express framework
const mongoose = require('mongoose')  // Import MongoDB ODM library

//Refactored to its own module Config
const {PORT, MONGODB_URI} = require('./utils/config')



const app = express()                   // Create Express application


// Define the shape of blog data in MongoDB
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

// Create a Model from the Schema
const Blog = mongoose.model('Blog', blogSchema)


mongoose.connect(MONGODB_URI, { family: 4 })

//Middleware: Parse JSON bodies, note bellow
app.use(express.json())


//Route: Get All Blogs
app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

// TODO
//Route: Post a new Blog
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


/* 
### __What is Middleware?__

Middleware functions have access to the __request__ and __response__ objects. They can:

- Execute any code
- Modify request/response objects
- End the request-response cycle
- Call the next middleware

```javascript
app.use(express.json())  // ← This is middleware!
```

__What `express.json()` does:__

- It's a built-in Express middleware
- It looks at incoming requests with `Content-Type: application/json`
- It parses the JSON body and makes it available as `request.body`
- Without this, `request.body` would be `undefined`!

__Middleware Order Matters:__

```javascript
app.use(express.json())    // Must come BEFORE routes
app.get('/api/blogs', ...) // Routes come AFTER
app.post('/api/blogs', ...)
```
*/