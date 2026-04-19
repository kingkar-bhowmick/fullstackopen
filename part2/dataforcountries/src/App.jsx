import { useEffect } from 'react'
import { useState } from 'react'

import countryService from './services/country'

import Item from './components/Item'

import './App.css'


const App = () => {

  // useStates
  const [countries, setCountries] = useState(null)
  const [countryName, setCountryName] = useState('')

  const [selectedCountry, setSelectedCountry] = useState(null)

 
  // Debug
 const displayHello = () => {

  console.log('Hello World')

  const name = countryName
  countryService.getByName(name).then(response => {
    console.log(response.data)
  })


   return (
   <h1>Hello World</h1>
     )}


     //-- Hooks // UseEffect

     useEffect(() => {

          console.log('Displaying the countries')
          
          countryService.getAll().then(response => {
            setCountries(response.data)
          })

              

     }, [])


  
// Option B
     /*useEffect(() => {
  if(countryName){
    countryService.getByName(countryName).then(response => {
      console.log(response.data.name) // hint: you log but never setCountries!
      // hint: what should you call here to update the displayed list?
    })
  }
}, [countryName])*/

   

     //-- Event Handlers


  const handleChange = (event) => {
    
    setCountryName(event.target.value)
  }

  const handleOnSubmit = (event) =>  {

    event.preventDefault()

  }


  const handleOnSelect = (country) => {

    setSelectedCountry(selectedCountry?.cca3 === country.cca3 ? null: country)


  }




     //-- Display / Render Helpers

     const displayResults = () => {


    if (countries === null) return null

      // Option A --Filter

     const countriesToShow = countryName === '' && countries != null
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(countryName.toLowerCase()))



      if( countriesToShow.length > 10)
      {
        return (<p> Too many matches, specify another field</p>)
      }

      //  more than 1 but less than or equal to 10
      if(countriesToShow.length > 1) 
      {
      
        return (
          <ul>
            {countriesToShow.map(country =>
               (<li key={country.cca3}>{country.name.common}
                <button  onClick={() => handleOnSelect(country)}>{selectedCountry?.cca3 === country.cca3 ? 'hide' : 'show'}</button>
                {selectedCountry && selectedCountry.cca3 === country.cca3 && <Item country={selectedCountry}/>}
             
                </li>))}
          </ul>
        )
      }

      if(countriesToShow.length === 1) 
      {

      const country = countriesToShow[0] 

      return (
        <div> 
        <Item country={country}/>
        </div>
       
            )
      }

      }


     // Form Submission

   
 
  return (
    <div>
    {displayHello()}
    <form  onSubmit={handleOnSubmit}>
      <span>find countries</span> <input value={countryName} onChange={handleChange} placeholder="Type here..." />
       </form>

    {displayResults()}
    </div>

   
  )
}

export default App