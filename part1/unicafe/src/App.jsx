import { useState } from 'react'


const Button = ({onClick, text}) => ( <button onClick={onClick}>{text}</button>  ) 


const StatisticLine = (props) => {

  return ( <tr>
    <td style={{ paddingRight: '12px' }}>{props.text}</td>
    <td>{props.value} {props.addText}</td>
  </tr> )
}

//Displaying Statics
 const Statistics = (props) => {
  

  if (props.total === 0)
  {
    return (<div> <p> No Feedback Given </p></div>)
  }

  else {

  return (
    <table>
      <tbody>
        <StatisticLine text="good"     value={props.good} />
        <StatisticLine text="neutral"  value={props.neutral} />
        <StatisticLine text="bad"      value={props.bad} />
        <StatisticLine text="all"      value={props.total} />
        <StatisticLine text="average"  value={props.average()} />
        <StatisticLine text="positive" value={props.positive()} addText="%" />
      </tbody>
    </table>
  )

  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  const handleGoodClick = () => {
     console.log('Clicked and value before for good:', good)
    setGood(good + 1)
  }

    const handleNeutralClick = () => {
         console.log('Clicked ann value before for neutral:', neutral)
    setNeutral(neutral + 1)
  }

    const handleBadClick = () => {
         console.log('Clicked and value before for bad:', bad)
    setBad(bad + 1)
  }



const total = good + bad + neutral

const average = () => { if(total === 0 ) { return (0)  } else  {return (good - bad) / total}}

const positive = () => { return average === 0 ? <div> 0 </div>: (good / total) * 100 } 
 
  return (
    <div>
    <h2>give Feedback</h2>
    <Button onClick={handleGoodClick} text='good'></Button>
    <Button onClick={handleNeutralClick} text='neutral'></Button>
    <Button onClick={handleBadClick} text='bad'></Button>
    <h2>statistics</h2>

    <Statistics good = {good}
     bad = {bad} 
     neutral = {neutral} 
     total= {total} 
     average = {average}
    positive = {positive} />

    </div>
  )
}

export default App