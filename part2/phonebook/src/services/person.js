import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

// takes param, new object
const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, Object) => {
    return axios.put(`${baseUrl}/${id}`,newObject)
}

export default {getAll, create, update}