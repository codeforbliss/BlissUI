import axios from 'axios'

const baseUrl = "api/v1/auth/"

const login = async (credential) => {
    const response = await axios.post(baseUrl + "authenticate", credential)
    return response.data
}

const signUp = async (credential) => {
  const response = await axios.post(baseUrl + "register", credential)
  return response.data
}

const checkToken = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}expired?token=${token}`);
    return response.data;
  } catch (error) {
    return true;
  }
};

export default {login, signUp, checkToken}