import {
    toast
} from 'react-toastify';
import axios from '../axios'
export const GetAllChats = async (config, state) => {

    try {
        //Load(true)
        const res = await axios.get('/api/chat/find-chat', {
            headers: {
                authorization: config
            }
        })

        if (res.status == 200) {
            console.log("chats here", res.data.chats);
            state(res.data.chats)
            //Load(false)
        }
    } catch (error) {
        console.log(error);
        //Load(false)
    }
}

export const CreateChat = async (userId, token, state) => {
    try {

        const config = {
            headers: {
                authorization: token
            }
        }
        const res = await axios.post('/api/chat/add-chat', {
            userId
        }, config)

        if (res.status == 200) {
            state(res.data.chat)
        }
    } catch (error) {
        console.log(error);
    }
}
export const CreateGroupChat = async (data, state, token, ErrorState) => {
    try {

        const res = await axios.post('/api/chat/create-group', data, {
            headers: {
                authorization: token
            }
        })

        if (res.status == 200) {
            state(res.data.chat)
        }
    } catch (error) {
        ErrorState(error.response.data.message)
        console.log(error);
    }
}
export const GetMessages = async (LoadState, ChatId, ChatState) => {

    try {
        LoadState(true)
        const res = await axios.get(`/api/message/all-messages/${ChatId}`)

        if (res.status == 200) {
            ChatState(res.data.result)
            LoadState(false)
            //socket.emit("join-chat",ChatId)
        }
    } catch (error) {
        console.log(error);
    }

}

export const SendMessage = async (Text, ChatId, token, state, MessageNull, setSocketMessage) => {
    try {
        MessageNull("")
        if (Text == "") {
            return toast.warning("Text Something For Send", {
                position: "top-right",
                theme: "dark"
            })
        }
        const res = await axios.post('/api/message/send-message', {
            Text,
            ChatId
        }, {
            headers: {
                authorization: token
            }
        })
        if (res.status == 200) {
            state((prev) => [...prev, res.data.result])
            setSocketMessage(res.data.result)
        }
    } catch (error) {
        console.log(error);
    }

}

export const RenameChat = async (ChatName, chatId, Load, changeState) => {
    try {

        Load(true)
        const res = await axios.put('/api/chat/rename', {
            ChatName,
            chatId
        })
        if (res.status == 200) {
            changeState(res.data.Update)
            Load(false)
        }
    } catch (error) {
        console.log(error);
        Load(false)
        toast.error(error.response.data.message, {
            position: "top-right",
            theme: "dark"
        })
    }

}

export const RemoveGroupMember = async (chatId, userId, ChangeState, Load) => {
    try {
        Load(true)
        const res = await axios.put('/api/chat/remove', {
            chatId,
            userId
        })

        if (res.status == 200) {
            console.log("Remove", res.data);
            ChangeState(res.data.RemoveUser)
            Load(false)
        }
    } catch (error) {
        Load(false)
        toast.error("Something Went Wrong", {
            theme: "dark"
        })
        console.log(error);
    }
}
export const AddMemberGroup = async (ChatId, userId, changeState) => {
    try {
        const res = await axios.put('/api/chat/add-member', {
            ChatId,
            userId
        })
        console.log("added", res.data);
        if (res.status == 200) {
            changeState(res.data.updateUser)
        }
    } catch (error) {
        toast.error("something Went wrong", {
            theme: "dark"
        })
        console.log(error);
    }
}