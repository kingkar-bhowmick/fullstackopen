import { useState } from 'react'
import './App.css'



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

  //Saves the vote state
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

      //const votes = allClicks

      const copy = [...allClicks]

      copy[selected] +=1


      setClick(copy)


      console.log(copy)
      
    }

    const findLargest = (arr) => {

      //Search the largest index and display the anecdote

      let maxIndex = 0

      for (let i=1; i<arr.length; i ++)

        {
          if(arr[i] > arr[maxIndex])
          maxIndex = i
        }
      
        return (
          <div>
            <h3>Anecdote with the most votes</h3>
            <p>{anecdotes[maxIndex]}</p>
            <p>has {arr[maxIndex]} votes</p>
          </div>
        )
    }

           
      
      
  return (
    <div>
      <h3>Anecdote of the day</h3>
    {anecdotes[selected]} <br />
      
      <p>has {allClicks[selected]} votes</p><br />
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleSelectedClick}>next anecdote</button>
      {findLargest(allClicks)}
    </div>
  )
}


export default App