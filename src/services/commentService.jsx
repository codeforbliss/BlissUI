import axios from "axios";

const baseUrl = 'api/comments';
let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
}

axios.interceptors.request.use(
    (config) => {
    config.headers.authorization = token;
    return config;
    },
    (error) => {
    return Promise.reject(error);
    },
);

const addReplyToComment = async (id, comment) => {
    try {
        axios.post(baseUrl + "/comment/" + id, comment);
    } catch (error) {
        console.error(error);
    }
}

const getAllComments = async () => {
    try {
        const response = await axios.get(baseUrl + '/all');
        return response;
    } catch (error) {
        console.error("Failed to get all comments", error);
    }
}

export default {addReplyToComment, getAllComments, setToken}
