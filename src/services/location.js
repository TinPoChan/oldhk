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

const addLocation = async (newLocation) => {
    try {
        const res = await axios.post(baseUrl, newLocation, config)
        return res.data
    } catch (err) {
        console.log(err)
        return null
    }
}

const getLocation = async (id) => {
    try {
        const res = await axios.get(`${baseUrl}/id/${id}`, config)
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

const updateLocation = async (Location) => {
    const id = Location.id
    try {
        const res = await axios.put(`${baseUrl}/id/${id}`, Location, config)
        return res.data
    }
    catch (err) {
        console.log(err)
        return null
    }
}


const exportLocation = {
    setConfig,
    addLocation,
    getLocations,
    deleteLocation,
    updateLocation,
    getLocation,
}

export default exportLocation