import React, { useState, useRef, useEffect } from 'react'
import { BsEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import './style.css'
import loginimage from '../../images/login.svg'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { handleLogin, handleRegister } from '../../collections/user'
import { useContext } from 'react'
import { chatContext } from '../../context/context'
import { Spinner } from '@chakra-ui/react'
import axios from 'axios'
function AuthPage () {
  //page render algorithm setup
  const [isSignUp, setSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirm] = useState(false)
  const Profile = useRef()
  const Navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { state, LoadingReq, UserSuccess } = useContext(chatContext)
  const [userData, setUserData] = useState({
    Name: '',
    Email: '',
    HashPassword: '',
    ConfirmPassword: '',
    Profile: ''
  })
  let [ProfileImage, setProfileImage] = useState('')
  console.log('My Profile', ProfileImage)
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
  //useEffects
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('HAPPY_TALKY_USER'))
    if (user) {
      Navigate('/')
    }
  }, [])

  //handle functions
  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleValidation = async () => {
    const { Email, HashPassword } = userData
    if (isSignUp) {
      if (
        Email == '' ||
        HashPassword == '' ||
        userData.Name == '' ||
        userData.ConfirmPassword == ''
      ) {
        return toast.warning('All Field Is Required', toast_option)
      } else {
        if (ProfileImage == '') {
          window.confirm('you are not adding profile you cant add it later')
        }
        if (userData.HashPassword !== userData.ConfirmPassword) {
          return toast.warning('Password Doesnt Match', toast_option)
        } else {
          setLoading(true)
          console.log('Now Your Profile Is ', ProfileImage)
          if (ProfileImage) {
            console.log('Profile is selected', ProfileImage)
            await handleChangeProFile()
          }
        }
      }
    } else {
      if (Email == '' || HashPassword == '') {
        return toast.warning('All Fields Are REquired', toast_option)
      } else {
        //handllOGIN
        handleLogin({ Email, HashPassword }, Navigate, LoadingReq, UserSuccess)
      }
    }
  }

  const handleProfile = e => {
    setProfileImage(e.target.files[0])
  }
  const handleChangeProFile = async () => {
    const form = new FormData()
    form.append('file', ProfileImage && ProfileImage)
    form.append('upload_preset', 'happy-talky')

    try {
      let { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/doxpbnjnk/image/upload',
        form
      )
      if (data) {
        const url = data.url
        await handleRegister(
          { ...userData, Profile: url },
          Navigate,
          LoadingReq,
          UserSuccess,
          setLoading
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  //Render Functions
  const signInRender = () => {
    return (
      <>
        <div className='login_field'>
          <input
            type='text'
            placeholder='email'
            name='Email'
            onChange={handleChange}
          />
        </div>

        <div className='login_field password'>
          <input
            type={`${showPassword ? 'text' : 'password'}`}
            placeholder='password'
            name='HashPassword'
            onChange={handleChange}
          />
          <div className='show' onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? <BsFillEyeSlashFill /> : <BsEyeFill />}
          </div>
        </div>
      </>
    )
  }
  //signUp render

  const SignUpRender = () => {
    return (
      <>
        <div className='login_field'>
          <input
            type='text'
            placeholder='username'
            name='Name'
            onChange={handleChange}
          />
        </div>
        <div className='login_field'>
          <input
            type='text'
            placeholder='email'
            name='Email'
            onChange={handleChange}
          />
        </div>
        {loading && <Spinner />}
        <div className='login_field password'>
          <input
            type={`${showPassword ? 'text' : 'password'}`}
            placeholder='password'
            name='HashPassword'
            onChange={handleChange}
          />
          <div className='show' onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? <BsFillEyeSlashFill /> : <BsEyeFill />}
          </div>
        </div>

        <div className='login_field password'>
          <input
            type={`${confirmPassword ? 'text' : 'password'}`}
            placeholder='confirm password'
            name='ConfirmPassword'
            onChange={handleChange}
          />
          <div className='show' onClick={() => setConfirm(prev => !prev)}>
            {confirmPassword ? <BsFillEyeSlashFill /> : <BsEyeFill />}
          </div>
        </div>

        <div className='login_field'>
          <label onClick={() => Profile.current.click()}>
            <button>Choose Profile</button>
          </label>
          <input
            type='file'
            onChange={handleProfile}
            ref={Profile}
            style={{ display: 'none' }}
          />
        </div>
      </>
    )
  }

  return (
    <div className='authPage'>
      <div className='container'>
        <div className='row auth-container'>
          <div className='col-12 col-md-6'>
            <div className='row login_form_container'>
              <div className='login_form'>
                <div className='login_title'>
                  <h4>{isSignUp ? 'SignUp' : 'SignIn'}</h4>
                </div>
                <hr />
                <div className='login_fields'>
                  {isSignUp ? SignUpRender() : signInRender()}
                  <div
                    className='login_field_button'
                    onClick={handleValidation}
                  >
                    <button>{isSignUp ? 'SignUp' : 'SignIn'}</button>
                  </div>
                  <div
                    className='login_field_button'
                    onClick={() => setSignUp(prev => !prev)}
                  >
                    <span>
                      {isSignUp
                        ? 'Already Registered Please SignIn'
                        : 'Not Registered Please SignUp'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-6 small_login'>
            <div className='row login_image_container'>
              <div className='login_image'>
                <img src={loginimage} alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AuthPage
