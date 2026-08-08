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

const persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-64231202"
    }

]

// routes
app.get('/', (request, response ) => {
  response.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


app.get('/api/info', (request, response) => {

  const date = new Date()

  Person.countDocuments({}).then(count => {
    response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
  })  
})

app.get('/api/persons/:id', async(request, response) => {
  const id = request.params.id

  const person = await Person.findById(id)

  if(person){

     response.json(person)

  }
  else  {
    response.status(404).end()
  }

  })


  app.delete('/api/persons/:id', async(request, response) => { 

    const id = request.params.id

    // Mongose delete router / api function
     const result = await Person.findByIdAndDelete(id)

    if (!result) {
        return response.status(404).end()
      }
      
    response.status(204).end()

  })


  app.post('/api/persons', async(request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name and/or number missing'
    })
  }

  const existingPerson =  await Person.findOne({ name: body.name })

  //if return truthy, execute the the command
  if(existingPerson)
  {
     return response.status(400).json({
      error: 'name must be unique'
    })
  }

  /*const maxID = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0*/

  /*const newPerson = {
    id: String(maxID + 1),
    name: body.name,
    number: body.number
  }*/

    const newPerson = new Person({
    name: body.name,
    number: body.number  })

   const savedPerson = await newPerson.save()

  response.json(savedPerson)

  console.log(newPerson)

})


const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})