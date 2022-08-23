import {
    toast
} from 'react-toastify';
import axios from '../axios'


const toast_option = {
    autoClose: 5000,
    theme: 'dark',
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true
}
export const handleRegister = async (form, Navigate, Login_Req,user,Loading) => {
    try {
        Login_Req()
        const res = await axios.post('/api/user/register', form)
        if (res.status === 200) {
            localStorage.setItem('HAPPY_TALKY_USER', JSON.stringify(res.data.user))
            Loading(false)
            Navigate('/')
            //navigate to chat page
        }
    } catch (error) {
        console.log(error);
        Loading(false)
        toast.error(error.response.data.message, toast_option)
    }
}

export const handleLogin = async (form, Navigate, Login_Req, Login_Success) => {
    try {
        Login_Req()
        const res = await axios.post('/api/user/login', form)
        if (res.status == 200) {
            localStorage.setItem('HAPPY_TALKY_USER', JSON.stringify(res.data.user))
            Login_Success(res.data.user)
            Navigate('/')
        }
    } catch (error) {
        toast.error(error.response.data.message, toast_option)
        console.log(error);
    }
}

export const SearchUser = async (search, state, ErrorState, LoadState, token) => {
    try {
        LoadState(true)
        const res = await axios.get(`/api/user/?search=${search}`, {
            headers: {
                authorization: token
            }
        })

        if (res.status == 200) {
            state(res.data.users)
            LoadState(false)
        }
    } catch (error) {
        console.log(error);
        ErrorState(error.response.data.message)
        LoadState(false)
    }
}