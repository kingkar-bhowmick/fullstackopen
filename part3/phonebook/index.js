const express = require('express')
const { request } = require('node:http')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const Person = require('./models/person')



const app = express()



app.use(express.static('dist'))

//// Middleware
app.use(express.json())
//app.use(morgan('tiny'))

app.use(cors())


// Create custom token // Token is function to display in console log for Middleware
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

// Use token
// Middleware
// method print, post, status, prints status code, response, and response time ms, and body 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


// Routes
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  }).catch(error =>  next(error))
})


app.get('/api/info', (request, response, next) => {

  const date = new Date()

  Person.countDocuments({}).then(count => {
    response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
  }).catch(error => next(error))  
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id).then(person => {

      if(person){

     response.json(person)

  }
  else  {
    response.status(404).end()
  }

  }).catch(error => next(error))

  })


  app.delete('/api/persons/:id', (request, response, next) => { 

    const id = request.params.id

    // Mongose delete router / api function
     Person.findByIdAndDelete(id).then(person => {

      if (!person) {
        return response.status(404).end()
      }
      
    response.status(204).end()

     }).catch(error => next(error))

  })


app.post('/api/persons', async (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'name and/or number missing' })
  }

  try {
    const existingPerson = await Person.findOne({ name })
    if (existingPerson) {
      return response.status(400).json({ error: 'name must be unique' })
    }

    const person = new Person({ name, number })
    const savedPerson = await person.save()
    response.json(savedPerson)
  } catch (error) {
    next(error)
  }
})


app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body

  Person.findByIdAndUpdate(request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  ).then(updatedPerson => {
    if(updatedPerson)
    {
      response.json(updatedPerson)
    }
    else {
      response.status(404).end()
    }
  }).catch(error => next(error))

  })

//Unknown Endpoint

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

//Error Handling Middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})