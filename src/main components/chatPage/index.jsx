import React from 'react'
import MessageSection from '../MessageSection'
import { AiOutlinePlus } from 'react-icons/ai'
import './style.css'
import { useState } from 'react'
import GroupChatModal from '../../modal/groupchatModal.jsx'
import { useContext } from 'react'
import { chatContext } from '../../context/context'
import ChatSection from '../chatsection'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
function ChatPage () {
  const [openGroupChat, SetOpenGroupChat] = useState(false)
  let Socket = false
  const { UserDetails } = useContext(chatContext).state
  const { setSocket, socket,selectedChat } = useContext(chatContext)

  useEffect(() => {
    Socket = io("https://happy-talky-app-site.onrender.com/");
    setSocket(Socket)
  }, [])

  return (
    <div className='chatpage'>
      <div className='row chat_page_'>
        <div className='container chat_page_'>
          <div className='chat_container chat_page_'>
            <div className={`message_section col-12 col-md-4 ${selectedChat ? "small_message":"show_message"}`}>
              <div className='mychats'>
                <div className='chat_title'>
                  <h2>My Chats</h2>
                  <div
                    className='group-chat'
                    onClick={() => {
                      SetOpenGroupChat(true)
                    }}
                  >
                    <h2>Group Chat</h2>
                    <AiOutlinePlus />
                  </div>
                </div>
                <hr />
                <MessageSection />
              </div>
            </div>
            <div className={`chat_section col-12 col-md-8 ${selectedChat ? "small_chat" :"show_chat"}`}>
              <ChatSection />
            </div>
          </div>
        </div>
      </div>
      <GroupChatModal
        isOpen={openGroupChat}
        onClose={SetOpenGroupChat}
        token={UserDetails.token}
      />
    </div>
  )
}

export default ChatPage
