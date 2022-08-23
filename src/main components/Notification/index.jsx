import React, { useContext } from 'react'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import './style.css'
import { MdNotificationsNone } from 'react-icons/md'
import { chatContext } from '../../context/context'
import NotificationBadge from 'react-notification-badge'
import { Effect } from 'react-notification-badge'
function Notification () {
  const { notification, setNotification, setSelected } = useContext(chatContext)
  console.log('notification', notification)
  return (
    <Menu>
      <MenuButton
        px={2}
        py={2}
        transition='all 0.2s'
        borderRadius='md'
        borderWidth='1px'
        _hover={{ bg: 'gray.300' }}
      >
        <NotificationBadge count={notification.length} effect={Effect.SCALE} />

        <MdNotificationsNone className='Notification' />
      </MenuButton>
      <MenuList>
        {notification.length > 0 ? (
          notification?.map(noti => {
            return (
              <MenuItem
                onClick={e => {
                  e.preventDefault()
                  setSelected(noti.ChatId)
                  const Remains = notification.filter(
                    noty => noty.ChatId !== noti.ChatId
                  )
                  setNotification(Remains)
                  localStorage.setItem('NOTY', Remains)
                }}
              >
                {noti?.ChatId.IsGroupChat
                  ? `NewMessage Notification In ${noti.ChatId.ChatName}`
                  : `Message From ${noti.Sender.Name}`}
              </MenuItem>
            )
          })
        ) : (
          <MenuItem>No Notification Yet</MenuItem>
        )}
      </MenuList>
    </Menu>
  )
}

export default Notification
