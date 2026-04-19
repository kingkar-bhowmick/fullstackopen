import { useEffect } from 'react'
import { useState } from 'react'

import countryService from './services/country'


const App = () => {

  // States
  const [countries, setCountries] = useState(null)
  const [countryName, setCountryName] = useState('')

   const [searchName, setSearchName] = useState('')
  


 
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


     //-- Hooks // UseState UseEffect

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

      // hint: more than 1 but less than or equal to 10
      if(countriesToShow.length > 1) 
      {
      
        return (
          <ul>
            {countriesToShow.map(country => (<li key={country.cca3}>{country.name.common}</li>))}
          </ul>
        )
      }

      if(countriesToShow.length === 1) 
      {

      const country = countriesToShow[0] 

      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>{country.capital}</p>
          <p>{country.area}</p>
          <ul>
            {Object.values(country.languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.name.common} />
        
        </div>
      )

      }

      }


     // Form Submission

   
 
  return (
    <div>
    {displayHello()}
    <form  onSubmit={handleOnSubmit}>
      find countries <input value={countryName} onChange={handleChange}/>
       </form>

    {displayResults()}
    </div>

   
  )
}

export default App