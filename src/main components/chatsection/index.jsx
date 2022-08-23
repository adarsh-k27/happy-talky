import React from 'react'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { useContext, useRef } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineSend } from 'react-icons/ai'
import { chatContext } from '../../context/context'
import './style.css'
import { useState, useEffect } from 'react'
import ProfileModal from '../../modal/profileModal'
import { Spinner } from '@chakra-ui/react'
import { GetMessages, SendMessage } from '../../collections/chat'
import Lottie from 'react-lottie'
import { Is_Last_Message, Is_Same_Sender } from '../../helper/chathelper'
import GroupChatSetting from '../../modal/gROUPCHATsETTING'
import animationData from '../../Animation/typing.json'
import { format } from 'timeago.js'
function ChatSection () {
  const {
    setSelected,
    selectedChat,
    state,
    socket,
    setNotification,
    notification
  } = useContext(chatContext)
  const [socketConnect, setScocketConnected] = useState(false)
  const [socketMessage, setSocketMessage] = useState(false)
  const UserId = state?.UserDetails._id
  const [isOpenProfileModal, setOpenProfileModal] = useState(false)
  const [isOpenGroupChatSetting, setGroupChatSetting] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [ChatMessages, setChatMessages] = useState([])
  const [NewMessage, setNewMessage] = useState('')
  const [Typing, setTyping] = useState(false)
  const [IsTyping, setIsTyping] = useState(false)
  const ScrollDown = useRef()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const GetSender = profile => {
    const userName =
      selectedChat &&
      selectedChat?.User?.find(user => user._id !== state.UserDetails._id)
    if (profile) return userName
    if(userName) return userName['Name']

  }

  const MessageFetch = async () => {
    await GetMessages(setLoading, selectedChat._id, setChatMessages)
    if (socket) {
      socket.emit('set-up', state.UserDetails)
      socket.on('connected', () => {
        setScocketConnected(true)
      })

      socket.emit('join-chat', selectedChat._id)
    }
  }

  useEffect(() => {
    if (selectedChat._id !== undefined && selectedChat._id !== null) {
      //socketRoomId = selectedChat._id
      MessageFetch()
    }
  }, [selectedChat])

  useEffect(() => {
    if (socket) {
      socket.off('recieve-message').on('recieve-message', newMessage => {
        if (newMessage.ChatId._id == selectedChat._id) {
          setChatMessages(prev => [...prev, newMessage])
        } else {
          console.log('Notify', newMessage)
          setNotification([newMessage, ...notification])
          localStorage.setItem('NOTY', JSON.stringify(notification))
        }
      })
      socket.off('typing').on('typing', (chatId) => {
        if(chatId == selectedChat._id){
           if (!IsTyping) {
          setIsTyping(true)
        }
        return
      }
      })
      socket.on('stop-typing', () => {
        if (IsTyping) {
          setIsTyping(false)
        }
        return
      })
    }
  })

  useEffect(() => {
    ScrollDown.current?.scrollIntoView({ behavior: 'smooth' })
  }, [ChatMessages])

  useEffect(() => {
    if (IsTyping) {
      setTimeout(() => {
        setIsTyping(false)
      }, 1000)
    }
  }, [IsTyping])

  const handleThreeDots = () => {
    if (selectedChat.IsGroupChat) {
      //add group member and remove group member
      setGroupChatSetting(true)
    } else {
      //view Profile
      setOpenProfileModal(true)
    }
  }
  const MessageRender = () => {
    return (
      <>
        <div className='head'>
          <div className="arrow d-block d-md-none " onClick={()=>setSelected(false)}>
            <AiOutlineArrowLeft />
          </div>
          <div className='chatname'>
            <span>
              {selectedChat.IsGroupChat ? selectedChat.ChatName : GetSender()}
            </span>
          </div>
          <div className='three_dots' onClick={handleThreeDots}>
            <span>
              <BsThreeDotsVertical />{' '}
            </span>
          </div>
        </div>
        <hr />
      </>
    )
  }
  const handleMessageSend = e => {
    //if(!socketConnect) return
    if (socketConnect) {
      socket.emit('typing', selectedChat._id)
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      MessageSend()
      // SendMessage(
      //   NewMessage,
      //   selectedChat._id,
      //   state.UserDetails.token,
      //   setChatMessages,
      //   setNewMessage,
      //   setSocketMessage
      // )
    }
  }

  const MessageSend = () => {
    if (NewMessage == '') return
    socket.emit('stop-typing', selectedChat._id)
    setTyping(false)
    SendMessage(
      NewMessage,
      selectedChat._id,
      state.UserDetails.token,
      setChatMessages,
      setNewMessage,
      setSocketMessage
    )
  }

  useEffect(() => {
    if (socketMessage) {
      socket.emit('send-message', socketMessage)
      console.log('sended to socket')
      return setSocketMessage(false)
    }
  }, [socketMessage])

  return (
    <div className='chatsection'>
      <div className='row _chat_container'>
        <div className={`container chat_messages `}>
          {selectedChat && MessageRender()}
          <div className={`messages slider ${!selectedChat ? 'middle' : 'bg'}`}>
            {!selectedChat ? (
              <div>
                <h1>Select A Chat For Messaging</h1>
              </div>
            ) : (
              ChatMessages &&
              ChatMessages.length > 0 &&
              ChatMessages.map((message, index) => {
                return (
                  <>
                    <div
                      ref={ScrollDown}
                      key={index}
                      className={`default_message ${message.Sender._id ==
                        state.UserDetails._id && 'own_messages'}`}
                    >
                      <div style={{ width: '2rem' }}>
                        {Is_Same_Sender(ChatMessages, message, index, UserId) ||
                          Is_Last_Message(ChatMessages, index, UserId)}
                      </div>
                      <div
                        className={`message_text ${message.Sender._id ==
                          state.UserDetails._id && 'own'}`}
                      >
                        <span>{message.Text}</span>
                        <p>
                          <small>{format(message.createdAt)}</small>
                        </p>
                      </div>
                    </div>
                  </>
                )
              })
            )}

            {Loading && selectedChat && (
              <Spinner size={'md'} className='middle' />
            )}
          </div>
          {IsTyping && (
            <Lottie
              height={15}
              width={70}
              options={defaultOptions}
              style={{ marginLeft: 0, float: 'left' }}
            />
          )}

          {selectedChat && (
            <>
              <hr />
              <div className=''>
                <form onKeyDown={handleMessageSend} className='inputText'>
                  <input
                    type='text'
                    placeholder='text some here...'
                    onChange={e => setNewMessage(e.target.value)}
                    value={NewMessage}
                  />

                  <div
                    className='send'
                    onClick={e => {
                      e.preventDefault()
                      MessageSend()
                    }}
                  >
                    <button>
                      {' '}
                      <AiOutlineSend className='send_icon' />{' '}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
      <ProfileModal
        isOpen={isOpenProfileModal}
        onClose={setOpenProfileModal}
        Profile={GetSender(true)}
      />
      <GroupChatSetting
        isOpen={isOpenGroupChatSetting}
        onClose={setGroupChatSetting}
        selectedChat={selectedChat}
      />
    </div>
  )
}

export default ChatSection
