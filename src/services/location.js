import axios from 'axios'
const baseUrl = process.env.REACT_APP_BACKEND_URL + 'locations'

let config = null

const setConfig = (token) => {
    config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    }
}

const postLocation = async (newLocation) => {
    try {
        const res = await axios.post(baseUrl, newLocation, config)
        return res.data
    } catch (err) {
        console.log(err)
        return null
    }
}

const getLocations = async () => {
    try {
        const res = await axios.get(baseUrl, config)
        return res.data
    } catch (err) {
        console.log(err)
        return []
    }
}

const deleteLocation = async (id) => {
    try {
        const res = await axios.delete(`${baseUrl}/id/${id}`, config)
        return res.data
    } catch (err) {
        console.log(err)
        return null
    }
}

const exportLocation = {
    setConfig,
    postLocation,
    getLocations,
    deleteLocation
}

export default exportLocation