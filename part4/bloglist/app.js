const blogsRouter = require('./controllers/blogs')
const express = require('express')    


const app = express()// Create Express application


//Middleware: Parse JSON bodies, note bellow
app.use(express.json())





//Given to the controllers
app.use('/api/blogs', blogsRouter)



module.exports = {app}