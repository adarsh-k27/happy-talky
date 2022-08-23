import React, { useEffect, useState, useContext } from 'react'
import './style.css'
import { AiOutlineSearch } from 'react-icons/ai'
import SideBar from '../sidebar_drawer'
import { chatContext } from '../../../context/context'
import ProfileModal from '../../../modal/profileModal'
import Notification from '../../Notification'
function NavBar () {
  const [isOpenSidebar, setOpenSidebar] = useState(false)
  const [isOpenProfileModal, setOpenProfileModal] = useState(false)
  const { state } = useContext(chatContext)

  return (
    <div className='Navbar'>
      <div className='navbar_container'>
        <div className='nav navlink' onClick={() => setOpenSidebar(true)}>
          <div className='icon'>
            <AiOutlineSearch />
          </div>
          <div className='label'>
            <label htmlFor=''>Search Bar</label>
          </div>
        </div>

        <div
          className='nav navlink
'
        >
          <div className='text_title'>HappyTalky</div>
        </div>
        <div className='small_nav'>
          <div className='div'>
            <Notification />
          </div>

          <div
            className='nav navlink'
            onClick={() => {
              setOpenProfileModal(true)
            }}
          >
            <div className='profile-round'>
              <img src={state.UserDetails?.Profile} alt='' />
            </div>
          </div>
        </div>
      </div>

      <SideBar isOpen={isOpenSidebar} onClose={setOpenSidebar} />
      <ProfileModal
        isOpen={isOpenProfileModal}
        onClose={setOpenProfileModal}
        Profile={state.UserDetails}
      />
    </div>
  )
}

export default NavBar
