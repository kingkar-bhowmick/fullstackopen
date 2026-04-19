import WeatherDisplay from "./WeatherDisplay"

const Item = ({ country }) => {  // hint: remove weather and weatherSelected props — not needed
  return (
  <div className="country-detail">
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common} />

      <WeatherDisplay capital={country.capital} />  {/* hint: just pass capital */}
    </div>
  )
}


export default Item