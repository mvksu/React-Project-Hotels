import axios from "axios";

const instance = axios.create({
    baseURL: 'https://hotels-react-c1e36-default-rtdb.europe-west1.firebasedatabase.app'
})

export default instance;