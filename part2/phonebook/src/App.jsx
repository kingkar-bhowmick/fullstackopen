import { useState } from 'react'
import Person from './component/Person.jsx'
import Filter from './component/Filter.jsx'
import PersonForm from './component/PersonForm.jsx'

import './App.css' 


const App = () => {

  // ---- STATE ----
  // The main list of all persons - never mutate this directly!
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')       // tracks name input keystroke by keystroke
  const [newNumber, setNewNumber] = useState('')   // tracks number input keystroke by keystroke
  const [searchName, setSearchName] = useState('') // tracks search input keystroke by keystroke


  // ---- DERIVED DATA ----
  // Recalculates every render - shows everyone if search is empty,
  // otherwise filters to names that include the search text
  // You kept confusing this: filter returns an ARRAY, then we map over it in JSX
  const personsToShow = searchName === ''
    ? persons
    : persons.filter(person => person.name.includes(searchName))


  // ---- HELPERS ----
  // Returns the found person object (truthy) or undefined (falsy)
  // You confused this a few times - find() needs a callback function, not a value!
  const alreadyExists = (name) => persons.find(person => person.name === name)


  // ---- EVENT HANDLERS ----
  // Each input has its OWN handler that updates its OWN state
  // You confused this early on by using one handler for everything
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value) // event.target.value = full current input value
  }

  const handleNumberChange = (event) => {
      console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    // You tried searchName.concat() and searchName(value) here before
    // but event.target.value already has the full typed string - just save it directly!
    setSearchName(event.target.value)
  }

  // ---- FORM SUBMISSION ----
  // One function handles everything when "add" is clicked
  // event.preventDefault() always goes first - stops page refresh
  const addPerson = (event) => {
    event.preventDefault()

    if (alreadyExists(newName)) {
      // Name already in list - warn user, do nothing else
      window.alert(`${newName} is already added to phonebook`)
    } else {
      // Build new person object from current input state
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1 // simple id
      }

      // concat creates a NEW array (no mutation!) - React sees the change and re-renders
      setPersons(persons.concat(personObject))

      // Clear both input fields after adding
      setNewName('')
      setNewNumber('')
    }
  }


  // ---- RENDER ----
  return (
    <div>
      <h2>Phonebook</h2>

      {/* Search box - filters the displayed list as you type */}
    
      <div><Filter searchName={searchName} handleSearchChange={handleSearchChange}/></div>
      

      {/* Form to add new persons */}

      <PersonForm addPerson = {addPerson}  newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>

      {/* 
        Map over personsToShow (not persons!) so search filtering works.
        You confused this many times - filter gives you the array,
        then map turns each person into JSX. Always need key prop!
      */}
      <div> 
        <Person persons = {personsToShow}/>
      </div>

    </div>
  )
}

export default App