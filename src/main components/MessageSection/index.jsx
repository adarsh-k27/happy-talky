import { Spinner } from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { GetAllChats } from '../../collections/chat'
import { chatContext } from '../../context/context'
import ProfileModal from '../../modal/profileModal'
import Notification from '../Notification'
import './style.css'
function MessageSection () {
  const { UserDetails } = useContext(chatContext).state
  const [openProfile, setOpenProfileModal] = useState(false)
  const { Chats, setAllChats, selectedChat, setSelected } = useContext(
    chatContext
  )
  const [load, setLoad] = useState(false)
  console.log('chats', Chats)
  var Details
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('HAPPY_TALKY_USER'))
    GetAllChats(user?.token, setAllChats)
  }, [selectedChat])
  return (
    <div className='message-section'>
      <div className='row'>
        <div className='container'>
          <div className='message_container slider'>
            {/* {
              load && <Spinner size={"lg"}/>
            } */}
            {Chats &&
              Chats.map((chat, index) => {
                {
                  if (!chat.IsGroupChat) {
                    Details = chat.User.filter(
                      user => user._id !== UserDetails._id
                    )
                  } else {
                    Details = chat.ChatName
                  }
                }
                return (
                  <div
                    key={index}
                    className={`_chat ${selectedChat &&
                      selectedChat._id == chat._id &&
                      'green'} `}
                    onClick={() => {
                      setSelected(chat)
                    }}
                  >
                    <strong>
                      {chat.IsGroupChat == true ? Details : Details[0].Name}{' '}
                    </strong>
                    {chat.LatestMessage && (
                      <p>
                        <small style={{ color: 'black', fontWeight: 'bold' }}>
                          {chat.LatestMessage?.Sender.Name} :
                        </small>
                        <small style={{ marginLeft: '1rem' }}>
                          {chat.LatestMessage?.Text}
                        </small>
                      </p>
                    )}
                  </div>
                )
              })}
          </div>
          <div className='small_navs   '>
            <div className='d-block d-sm-none'>
              <Notification />
            </div>
            <div
              className='profile_image_round d-block d-sm-none'
              onClick={() => {
                setOpenProfileModal(true)
              }}
            >
              <img src={UserDetails?.Profile} alt='' />
            </div>
          </div>
        </div>
        
        <ProfileModal
          isOpen={openProfile}
          onClose={setOpenProfileModal}
          Profile={UserDetails}
        />
      </div>
    </div>
  )
}

export default MessageSection
