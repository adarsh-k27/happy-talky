import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'

import React from 'react'
import './style.css'
function ProfileModal ({ isOpen, onClose, Profile }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>My Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className='profile_modal'>
            <img src={Profile?.Profile}></img>
            <div className='pro_details'>
              <label>
                <span>{Profile?.Name}</span>{' '}
              </label>
              <label>
                 <span>{Profile?.Email}</span>{' '}
              </label>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button> */}
          {/* <Button variant='ghost'>Secondary Action</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ProfileModal
