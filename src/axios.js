import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "https://happy-t-alky-chat-app.herokuapp.com/"
})

export default axiosInstance;