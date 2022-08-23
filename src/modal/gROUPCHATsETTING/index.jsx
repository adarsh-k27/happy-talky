import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner
} from '@chakra-ui/react'
import { useContext } from 'react'
import { chatContext } from '../../context/context'
import ToolTip from '../../main components/component_helper/ToolTip'
import { SearchUser } from '../../collections/user'
import './style.css'
import { useState } from 'react'
import UserProfile from '../../main components/component_helper/userProfile'
import SkeletonLoad from '../../main components/component_helper/skeleton'
import { ToastContainer, toast } from 'react-toastify'
import { AddMemberGroup, RemoveGroupMember, RenameChat } from '../../collections/chat'

function GroupChatSetting ({ isOpen, onClose,selectedChat }) {
  const {  state, setSelected } = useContext(chatContext)
  const [MemberSearchResult, setMemberSearch] = useState([])
  const [UserSearch, setSearchUser] = useState('')
  const [LoadRemove, setLoadRemove] = useState(false)
  const [Load, setLoad] = useState(false)
  const [LoadRename, setLoadRename] = useState(false)
  const [Error, setError] = useState(false)
  const [Rename, setRename] = useState('')
  const handleSearch = e => {
    setSearchUser(e.target.value)
    SearchUser(
      e.target.value,
      setMemberSearch,
      setError,
      setLoad,
      state.UserDetails.token
    )
  }
  const ONCLOSE = () => {
    setRename('')
    onClose()
  }

  const handleRemoveMember = (Content, User, e) => {
    e.preventDefault()
    Validation(Content, User)
    if (Content == state.UserDetails._id || Content == selectedChat.IsAdmin) {
      return toast.error('YOU Cant Remove Your Self', { theme: 'dark' })
    }
    window.confirm('Do You Want To Remove This User from Group')
    RemoveGroupMember(selectedChat._id, Content, setSelected, setLoadRemove)
  }
  const handleRename = (Content, User) => {
    Validation(Content, User)
    if (!Validation(Content, User)) {
      RenameChat(Rename, selectedChat._id, setLoadRename, setSelected)
      ONCLOSE()
    }
  }
  const Validation = (Content, user) => {
    if (user !== selectedChat.IsAdmin)
      return toast.warning('Changes Can Be Only Done Admin', {
        position: 'top-right',
        theme: 'dark'
      })

    if (Content == '')
      return toast.warning('Please Type Any Group Name', {
        position: 'top-right',
        theme: 'dark'
      })
  }

  const handleSelect = (_id,User )=> {
    Validation(_id,User)
    if (selectedChat.User.find(user => user._id == _id)) {
      return toast.warning('User Already exist In Group', { theme: 'dark' })
    } else {
      AddMemberGroup(selectedChat._id,_id,setSelected)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedChat.ChatName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className='setting'>
            <div className='Tool'>
              {selectedChat  &&
                selectedChat?.User?.map((user, index) => {
                  return (
                    <ToolTip
                      _id={user._id}
                      Name={user.Name}
                      deleteHandler={e =>
                      handleRemoveMember(user._id, state.UserDetails._id, e)
                      }
                    ></ToolTip>
                  )
                })}
              {LoadRemove && <Spinner />}
            </div>
            <div className='search_input inp'>
              <input
                type='text'
                placeholder='Rename Group'
                onChange={e => setRename(e.target.value)}
              />
              <button
                className='btn btn-success Rename'
                onClick={() => handleRename(Rename, state.UserDetails._id)}
                disabled={LoadRename}
              >
                {LoadRename ? <Spinner /> : 'Rename'}
              </button>
            </div>
            <div className='results'>
              <div className='inp'>
                <input
                  type='text'
                  placeholder='Search user'
                  onChange={handleSearch}
                />
              </div>

              <div
                className='added-list'
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5rem'
                }}
              >
                {Error && <div className='text-danger'>{Error}</div>}
                {MemberSearchResult.length > 0 &&
                  MemberSearchResult.slice(0, 3).map((user, index) => (
                    <UserProfile
                      Profile={user}
                      chat={true}
                      SelectFunction={()=>handleSelect(user._id,state.UserDetails._id)}
                    />
                  ))}
                {Load && <SkeletonLoad />}
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
      <ToastContainer />
    </Modal>
  )
}

export default GroupChatSetting
