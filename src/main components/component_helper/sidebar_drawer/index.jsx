import React, { useState } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react'
import SkeletonLoad from '../skeleton'
import UserProfile from '../userProfile'
import { SearchUser } from '../../../collections/user'
import { useContext } from 'react'
import { chatContext } from '../../../context/context'
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { CreateChat } from '../../../collections/chat'

function SideBar ({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false)
  const [loadChat, setLoadChat] = useState(false)
  const [search, setSearch] = useState('')
  const [searchedUser, setSerachedUser] = useState([])
  const [NoUserText, setNoUserText] = useState('')
  const { selectedChat, state, Chats, setSelected } = useContext(chatContext)

  const handleChange = e => {
    setSearch(e.target.value)
  }
  const handleSearch = e => {
    e.preventDefault()
    if (search !== '') {
      SearchUser(
        search,
        setSerachedUser,
        setNoUserText,
        setLoading,
        state.UserDetails.token
      )
    } else {
      toast.warning('provide some text', {
        position: 'top-left',
        theme: 'dark'
      })
    }
  }
  const OnClose = () => {
    onClose(false)
    setSerachedUser([])
    setSearch('')
  }
  const handleSelection = async (_id, e) => {
    let Exist = false
    Chats.map(chat => {
      if (chat.IsGroupChat == false) {
        console.log('find not group chat')
        if (chat.User.includes(_id)) {
          Exist = true
        }
      }
    })
    if (!Exist) {
      CreateChat(_id, state.UserDetails.token, setSelected)
    }
    OnClose()
  }
  //   if (chat) {
  //     //add groupmember
  //     const mEMBEReXIST = GroupMembers.find(member => member._id == Profile._id)
  //     if (!mEMBEReXIST) {
  //       setGroupMembers([
  //         ...GroupMembers,
  //         {
  //           Name: Profile.Name,
  //           _id: Profile._id
  //         }
  //       ])
  //     } else {
  //       return toast.warning('User Already selected', toast_option)
  //     }
  //     //avoid if its already selected
  //   } else {
  //     Chats.map(chat => {
  //       const Exist = chat.User.find(user => user._id == Profile._id)
  //       if (!Exist) {
  //         CreateChat(Profile._id, state.UserDetails.token, setSelected)
  //       }
  //     })
  //   }
  // }

  useEffect(() => {
    onClose()
  }, [selectedChat])
  return (
    <div className='sidebar' style={{ fontFamily: 'sans-serif' }}>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={OnClose}
        finalFocusRef={''}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Here...</DrawerHeader>
          <hr />
          <DrawerBody
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div className='search'>
              <input
                type='text'
                placeholder='serach Here....'
                onChange={handleChange}
              />
              <button onClick={handleSearch} className='nav' style={{padding:".5rem 1rem"}}>
                Go
              </button>
            </div>
            {/* content */}
            {loading && <SkeletonLoad />}
            <div className='users_profiles'>
              {searchedUser.length > 0 &&
                searchedUser.map((item, index) => {
                  return (
                    <UserProfile
                      Profile={item}
                      SelectFunction={e => handleSelection(item._id, e)}
                    />
                  )
                })}
            </div>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
      <ToastContainer />
    </div>
  )
}

export default SideBar
