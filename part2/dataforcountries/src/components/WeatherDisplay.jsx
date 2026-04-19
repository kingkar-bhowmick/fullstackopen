import { useState, useEffect } from 'react'
import weatherService from '../services/weather'  // hint: fix the path — you're in components/

const WeatherDisplay = ({ capital }) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    // hint: only fetch if capital exists
    if (capital) {
      weatherService.getWeatherByCity(capital).then(response => {
          setWeather(response.data)  // hint: .current has temp, wind etc
        })
        .catch(err => console.log('Weather error:', err))
    }
  }, [capital])  // hint: re-run when capital changes

  // hint: guard before rendering
  if (weather === null) return null

  return (
 <div className="weather">
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Wind: {weather.wind.speed} m/s</p>
      {/* hint: weather.weather[0].icon gives you the icon code */}
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
    </div>
  )
}

export default WeatherDisplay