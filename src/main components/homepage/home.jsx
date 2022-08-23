import React, { useEffect, useContext } from 'react'
import NavBar from '../component_helper/navbar'
import { useNavigate } from 'react-router-dom'
import { chatContext } from '../../context/context'
import { GetAllChats } from '../../collections/chat'
import ChatPage from '../chatPage'
import { useState } from 'react'
import { Spinner } from '@chakra-ui/react'

function HomePage () {
  const Navigate = useNavigate()
  const [Load, setLoad] = useState(false)
  const { UserSuccess, setAllChats, state } = useContext(chatContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('HAPPY_TALKY_USER'))
    if (!user) {
      Navigate('/auth')
    } else {
      setLoad(true)
      UserSuccess(user)
      console.log('Time To Fetch')

      setTimeout(() => {
        setLoad(false)
      }, [1000])

      // window.location.reload()
    }
  }, [])

  useEffect(() => {
    console.log('time to fetch', state.UserDetails.Name)
    if (state.UserDetails.token) {
      //setLoad(true)
      GetAllChats(state.UserDetails?.token, setAllChats)
      //setLoad(false)
    }
  }, [state.UserDetails])

  return (
    <div className='home_page'>
      <NavBar />
      {Load && (
        <Spinner
          style={{ position: 'absolute', top: '50%', left: '50%' }}
          size={'lg'}
          thickness='4px'
        />
      )}
      <ChatPage />
    </div>
  )
}

export default HomePage
