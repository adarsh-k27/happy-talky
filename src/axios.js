import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "https://happy-talky-app-site.onrender.com/"
})

export default axiosInstance;