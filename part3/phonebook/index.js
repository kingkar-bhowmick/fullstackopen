const express = require('express')
const { request } = require('node:http')

const app = express()

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


app.get('/', (request, response ) => {
    response.send('<h1><a href="http://localhost:3001/api/persons">Person list</a><h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})