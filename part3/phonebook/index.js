const express = require('express')
const { request } = require('node:http')

const app = express()

app.use(express.json())

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


app.get('/api/info', (request, response) => {

  const date = new Date()
  const phonebookCount = persons.length

  response.send(`<p>Phonebook has info for ${phonebookCount} people</p><p>${date}</p>`)
  
})

app.get('/api/persons/:id',(request, response) => {
  const id = request.params.id

  const person = persons.find(person => person.id == id)

  if(person){

     response.json(person)

  }
  else  {
    response.status(404).end()
  }

  })


  app.delete('/api/persons/:id', (request, response) => { 

    const id = request.params.id

     const index = persons.findIndex(p => p.id === id)

    if (index === -1) {
        return response.status(404).end()
      }

      persons.splice(index, 1)

      
    response.status(204).end()

  })


  app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const existingPerson = persons.find(person => person.name == body.name)

  if(body.name == existingPerson)
  {
     return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const maxID = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0

  const newPerson = {
    id: String(maxID + 1),
    name: body.name,
    number: body.number
  }

  persons.push(newPerson)

  console.log(newPerson)

  response.json(newPerson)
})


const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})