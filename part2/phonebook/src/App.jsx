import { useState, useEffect } from 'react';
import Person from './components/Person.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import axios from 'axios'

import './App.css' 

import personService from './services/person'

import Notification from './components/Notification.jsx';


const App = () => {

  // ---- STATE ----
  // The main list of all persons - never mutate this directly!
  const [persons, setPersons] = useState([ ])

  const [newName, setNewName] = useState('')       // tracks name input keystroke by keystroke
  const [newNumber, setNewNumber] = useState('')   // tracks number input keystroke by keystroke
  const [searchName, setSearchName] = useState('') // tracks search input keystroke by keystroke

  const [message, setMessage] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

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


  const deleteOnClick = (id) => {
  
  if(window.confirm('Are you sure you want to delete this Person'))
  {
     personService.remove(id).then( () => {

      const deletedName = persons.find(p => p.id === id).name

      setPersons(persons.filter(person => person.id !== id))

      setErrorMessage(
        `Information of '${deletedName}' has been removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

     })
  }

}

  // ---- FORM SUBMISSION ----
  // One function handles everything when "add" is clicked
  // event.preventDefault() always goes first - stops page refresh
  const addPerson = (event) => {
    event.preventDefault()

    if (alreadyExists(newName)) {
      // Name already in list - warn user, do nothing else
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one ?`))
      {
        const personObject = persons.find(person => person.name == newName)

        const updatedPersonOject = {...personObject, number:newNumber}
       

        personService.update(updatedPersonOject.id, updatedPersonOject).then( response => {
          setPersons(persons.map(p => p.id !== updatedPersonOject.id? p:response.data)) 
          setNewName('')
          setNewNumber('')

        setMessage(
          `Information for '${newName}' changed`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)

          // 

        
        }).catch(error => {
          setErrorMessage(
          `Information of '${newName}' has already been removed from server`
        )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)}

            ,setNewName(''), 
        setNewNumber('')
        ,setPersons(persons.filter(p => p.id !== updatedPersonOject.id) )
             
      )
      }


    } else {
      // Build new person object from current input state
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1 // simple id
      }

      // concat creates a NEW array (no mutation!) - React sees the change and re-renders
      //setPersons(persons.concat(personObject))


      // Clear both input fields after adding
      //setNewName('')
      //setNewNumber('')
    personService.create(personObject).then(
      response => {
      setPersons(persons.concat(response.data))
      

        setMessage(
          `Added '${newName}' to the Phonebook`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)

        setNewName('') 
        setNewNumber('')
    })
  } 


  }
  //-- Fetching from the Server Data 

  console.log('Test')

  const hook = () =>  {

    console.log('Use Effects')

    axios.get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled')
     setPersons(response.data)
    })
  }

  useEffect(hook,[])

  // ---- RENDER ----
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />
      <Notification message={errorMessage} />

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
        <Person persons = {personsToShow} deleteOnClick={deleteOnClick}/>
      </div>

    </div>
  )
}


export default App
