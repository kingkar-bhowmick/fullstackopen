import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const searchByName = 'https://studies.cs.helsinki.fi/restcountries/api/name/'


const getAll = () => {
    return axios.get(baseUrl)
}

const getByName = (name) => {
    return axios.get(searchByName + name)
}



export default {getAll, getByName}