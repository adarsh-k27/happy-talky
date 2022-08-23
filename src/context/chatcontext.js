import React, {
    useReducer,
    useState
} from 'react'
import {
    chatContext
} from './context'
import {
    SIGNIN_REQ,
    SIGNIN_SUCCESS
} from '../actions'
import {
    userReducer
} from '../reducer/UserReducer'


const InitialState = {
    Loading: false,
    Error: false,
    UserDetails: {}
}

const ChatContextProvider = ({
    children
}) => {



    const [selectedChat, setSelected] = useState(false)
    const [Chats, setAllChats] = useState([])
    const [state, dispatch] = useReducer(userReducer, InitialState)
    const [GroupMembers, setGroupMembers] = useState([])
    const [socket, setSocket] = useState(false)
    const [notification, setNotification] = useState([])

    const LoadingReq = () => {
        dispatch({
            type: SIGNIN_REQ
        })
    }

    const UserSuccess = (USER) => {
        dispatch({
            type: SIGNIN_SUCCESS,
            payload: USER
        })
    }

    return ( <
        chatContext.Provider value = {
            {
                state,
                LoadingReq,
                UserSuccess,
                selectedChat,
                setSelected,
                Chats,
                setAllChats,
                GroupMembers,
                setGroupMembers,
                socket,
                setSocket,
                notification,
                setNotification
            }
        } > {
            children
        } </chatContext.Provider>
    )
}

export default ChatContextProvider;