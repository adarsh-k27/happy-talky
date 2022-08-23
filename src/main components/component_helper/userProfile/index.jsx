import React, { useState } from 'react'
import { useContext } from 'react'
import { CreateChat } from '../../../collections/chat'
import { chatContext } from '../../../context/context'
import {toast,ToastContainer} from 'react-toastify'
import './style.css'

//select achat fumction
// if that chat is already created not crate chat
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


function UserProfile ({ Profile, chat,SelectFunction }) {
  const {
    Chats,
    setSelected,
    state,
    setGroupMembers,
    GroupMembers
  } = useContext(chatContext)
  const handleSelection = async () => {
    if (chat) {
      //add groupmember
      const mEMBEReXIST = GroupMembers.find(member => member._id == Profile._id)
      if (!mEMBEReXIST) {
        setGroupMembers([
          ...GroupMembers,
          {
            Name: Profile.Name,
            _id: Profile._id
          }
        ])
      } else {
        return toast.warning('User Already selected', toast_option)
      }
      //avoid if its already selected
    } else {
      Chats.map(chat => {
        const Exist = chat.User.find(user => user._id == Profile._id)
        if (!Exist) {
          CreateChat(Profile._id, state.UserDetails.token, setSelected)
        }
      })
    }
  }

  return (
    <div className='user-profile' onClick={SelectFunction} key={Profile._id}>
      <div className='container'>
        <div className=' user_profile_container'>
          <div className='user_profile_image'>
            <img src={Profile?.Profile} alt='' />
          </div>
          <div className='user_profile_details'>
            <div className='userName'>
              <span>{Profile?.Name} </span>
            </div>
            <div className='user_Email'>
              <span>{Profile?.Email}</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default UserProfile
