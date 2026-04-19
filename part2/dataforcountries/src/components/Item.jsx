
const Item = ({country}) => {

return (
<div>
     <h1>{country.name.common}</h1>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area} &#13218;</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.name.common} />
</div>
     
)
   
}


export default Item