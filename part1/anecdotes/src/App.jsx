import { useState } from 'react'




const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
//length of array
 const nummberAnecdotes = anecdotes.length



  // stateful 
  const [selected, setSelected] = useState(0)

  //will be deleted
  const [vote, setVote] = useState(0)

  const [allClicks, setClick] = useState(new Array(nummberAnecdotes).fill(0))

   

    //Generates Random within the range of array
    const getRandomInt = (max) => (Math.floor(Math.random() * max));
   

    const handleSelectedClick = () => {

      //function calls, everytime generates a new
     const temp = getRandomInt(nummberAnecdotes)

      //change the selected to a random number
      setSelected(temp)

      console.log('Logging...',anecdotes[temp], temp ) 
      
    }

    const handleVoteClick = () => {

      setVote (vote + 1)

        const votes = allClicks

        const copy = { ...votes }
        // increment the property 2 value by one
        copy[2] += 1 
      setClick(votes)
      console.log(votes)
    }

           
      
      
  return (
    <div>
      {selected} {anecdotes[selected]} <br />
      <p>has {vote} votes</p> 
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleSelectedClick}>next anecdote</button>
   
    </div>
  )
}


export default App