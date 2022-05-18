import elementService from './element'
import locationService from './location'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
    elementService.setConfig(token)
    locationService.setConfig(token)
}

const getToken = () => {
    return token
}

const getConfig = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    }
}


const exportUser = {
    setToken,
    getToken,
    getConfig
}

export default exportUser