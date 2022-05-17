import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/elements'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}
const getToken = () => {
    return token
}

const exportElement = {
    setToken,
    getToken,
}

export default exportElement