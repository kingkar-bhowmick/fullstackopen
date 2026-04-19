import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY


const getWeatherByCity = (cityName) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`)
}

const getCoordinates = (cityName) => {
  return axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`)
}

const getWeather = (lat, lon) => {
  return axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
}



export default { getWeatherByCity } 