import axios from "axios";

const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        'key': 'AIzaSyBvw_ddSGqbL7T7rC8S-hI-Su6wNcrg7Zk'
    }
})

export default instance;