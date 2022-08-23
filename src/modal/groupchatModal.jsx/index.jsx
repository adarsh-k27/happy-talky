import React, { useContext } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import './style.css'
import { useState } from 'react'
import { SearchUser } from '../../collections/user'
import UserProfile from '../../main components/component_helper/userProfile'
import SkeletonLoad from '../../main components/component_helper/skeleton'
import { chatContext } from '../../context/context'
import ToolTip from '../../main components/component_helper/ToolTip'
import { toast, ToastContainer } from 'react-toastify'
import { CreateGroupChat } from '../../collections/chat'
function GroupChatModal ({ isOpen, onClose, token }) {
  const [ChatName, setChatName] = useState('')
  const [searchUser, setSearchUser] = useState('')
  const [load, setLoad] = useState(false)
  const [searchedList, setSearchedList] = useState([])
  const [addedUser, setAddedUser] = useState([])
  const [Error, setError] = useState(false)
  const {
    GroupMembers,
    setGroupMembers,
    state,
    setSelected,
    selectedChat
  } = useContext(chatContext)
  console.log('selectedChat', selectedChat)
  const handleChange = e => {
    setChatName(e.target.value)
  }
  const handleSearch = e => {
    setSearchUser(e.target.value)
    SearchUser(e.target.value, setSearchedList, setError, setLoad, token)
  }
  const ONclose = () => {
    setSearchedList([])
    setSearchUser('')
    onClose(false)
    setGroupMembers([])
  }
  const handleCreate = () => {
    if (GroupMembers.length < 2) {
      return toast.warning('You Must Add Morethan 2 People', {
        position: 'top-right',
        theme: 'dark'
      })
    }
    if (ChatName == '') {
      return toast.warning('Chat Name is Required', {
        position: 'top-right',
        theme: 'dark'
      })
    }
    CreateGroupChat(
      { ChatName, User: GroupMembers },
      setSelected,
      state.UserDetails.token,
      setError
    )
    ONclose()
  }

  const handleRemoveGroupMember = _id => {
    setGroupMembers(prev => prev.filter(member => member._id !== _id))
  }
  const handleSelect = Profile => {
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
      return toast.warning('User Already selected', { theme: 'dark' })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={ONclose}>
      {Error && toast.error(Error, { position: 'top-right', theme: 'dark' })}
      <ToastContainer />
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create GroupChat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className='group-create'>
            <input
              type='text'
              placeholder=' Group Name'
              onChange={handleChange}
            />
            <input
              type='text'
              placeholder='Add User  eg: Jhon , Adarsh'
              onChange={handleSearch}
            />
          </div>
          <div className='added-user'>
            <div className='list_of_added_user'>
              {/* row list */}
              {GroupMembers.length > 0 &&
                GroupMembers.map(member => (
                  <ToolTip
                    Name={member.Name}
                    _id={member._id}
                    deleteHandler={() => handleRemoveGroupMember(member._id)}
                  />
                ))}
            </div>
            <div
              className='added-list'
              style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}
            >
              {Error && <div className='text-danger'>{Error}</div>}
              {searchedList.length > 0 &&
                searchedList
                  .slice(0, 3)
                  .map((user, index) => (
                    <UserProfile
                      Profile={user}
                      SelectFunction={() => handleSelect(user)}
                    />
                  ))}
              {load && <SkeletonLoad />}
            </div>
            <div className='btn' onClick={handleCreate}>
              <button className='btn btn-primary'>Create</button>
            </div>
          </div>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default GroupChatModal
