import axios from 'axios';

const baseUrl = "/api/posts";

// Retrieve the token from local storage
const loggedUserJSON = window.localStorage.getItem("loggedUser");

let token = null;

// Function to set the token
const setToken = (newToken) => {
  if (newToken) {
    token = `Bearer ${newToken}`;
  } else {
    console.error('Token not found or invalid');
  }
}

// // Parse and set the token
const user = JSON.parse(loggedUserJSON);
if (user && user.token) {
  setToken(user.token);
} else {
  console.error('User not logged in or token not available');
}

// // Axios request interceptor to add token to all requests

axios.interceptors.request.use(config => {
  // Ensure the interceptor is applied
  config.headers.Authorization = token;
  return config;
}, error => Promise.reject(error));

// Function to post a rant
export const postRant = async (rant, author) => {
  console.log("posting")
  const post = {
    author,
    rant
  };
  const headers = { Authorization : token };
  try {
    console.log("posting")
    axios.post(baseUrl + '/create', post);
  } catch (error) {
    console.error('Error posting rant:', error);
    throw error; // Rethrow error to handle it in the component
  }

}

export default {postRant} 
