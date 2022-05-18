import axios from 'axios'
const baseUrl = process.env.REACT_APP_BACKEND_URL + 'elements'

let config = null

const setConfig = (token) => {
    config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    }
}

const postElement = async (newElement) => {
    try {
        const res = await axios.post(baseUrl, newElement, config)
        return res.data
    } catch (err) {
        console.log(err)
        return null
    }
}

const getElement = async (id) => {
    try {
        const res = await axios.get(`${baseUrl}/id/${id}`, config)
        return res.data
    } catch (err) {
        console.log(err)
        return null
    }
}

const getElements = async () => {
    try {
        const res = await axios.get(baseUrl, config)
        return res.data
    } catch (err) {
        console.log(err)
        return []
    }

}

const deleteElement = async (id) => {
    try {
        const res = await axios.delete(`${baseUrl}/id/${id}`, config)
        return res.data
    }
    catch (err) {
        console.log(err)
        return null
    }
}

const updateElement = async (element) => {
    const id = element.id
    try {
        const res = await axios.put(`${baseUrl}/id/${id}`, element, config)
        return res.data
    }
    catch (err) {
        console.log(err)
        return null
    }
}


const exportElement = {
    setConfig,
    postElement,
    getElements,
    deleteElement,
    getElement,
    updateElement,
}

export default exportElement