import { Spinner } from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react'
import { IoIosClose } from 'react-icons/io'
import { chatContext } from '../../../context/context'
import './style.css'
function ToolTip ({ _id, Name, deleteHandler,Loading }) {
  return (
    <div className='ToolTip' key={_id}>
      <div className='content'>
        {
          Loading && <Spinner />
        }
        <small>{Name && Name}</small>
        <div className='iconn' onClick={deleteHandler}>
          <IoIosClose className='text-warning tooltip_close' />
        </div>
      </div>
    </div>
  )
}

export default ToolTip
