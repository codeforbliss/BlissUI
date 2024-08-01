import axios from 'axios'

const baseUrl = "api/user/"

const setUserLocation = async (location) => {
    const response = await axios.post(baseUrl + "set/location", location)
    return response.data
}

export default {setUserLocation};