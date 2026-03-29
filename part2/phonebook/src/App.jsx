import { useState } from 'react'



const App = () => {

  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')

    const [newNumber, setNewNumber] = useState('')

     const [showAll, setShowAll] = useState(true)


  const handleNoteChange = (event) => {
    // track changes to the state, key stroke
   console.log(event.target.value)
    setNewName(event.target.value)
  }



  // adds a peron object to the array
  const addPerson = (event)  => {

    
    console.log(alreadyExists(newName))

    if(alreadyExists(newName))
    {
        event.preventDefault()
      window.alert(`${newName} is already added to phonebook`)
    }

    else {
  event.preventDefault()
      //creates the new object by taking the inputs from the form
    const nameObejct = {
      name:newName,
      number:newNumber
    }

    // copying and adding without mutating
    setPersons(persons.concat(nameObejct))

    // clears the input fields
    setNewName('')
    setNewNumber('')
    }
  
  }

    // track changes to the state, key stroke
    const handleNumberChange = (event) => {

      console.log(event.target.value)
        setNewNumber(event.target.value)
  }


  //returns if exists the name itself or undefined
  const alreadyExists = (newname) => persons.find(person => person.name === newname) // retunrs Truthy or Falsy

 // const personsToShow = showAll ? persons : persons.filter(person => person.name === true)

  return (
    <div>
      <h2>Phonebook</h2>  
      <form>
        <div>
          name: <input  value={newName} onChange={handleNoteChange}/>
        </div>
         <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>

        <div>
          <button type="submit" onClick = {addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p>{person.name} {person.number}</p>)} 
      </div>
    </div>
  )
}

export default App