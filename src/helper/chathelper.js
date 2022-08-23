import { Tooltip } from "@chakra-ui/react"
import React from "react"
export const Is_Same_Sender = (messages, currentMessage, currentIndex, UserId) => {
    if (currentIndex < messages.length - 1 &&
        (messages[currentIndex + 1].Sender._id !== currentMessage.Sender._id ||
            messages[currentIndex + 1].Sender._id == undefined) &&
        currentMessage.Sender._id !== UserId)

        return (
            <div>
               <img src={currentMessage.Sender.Profile} style={{width:"2rem",height:"2rem",borderRadius:"50%"}}></img>
            </div>

        )
}

export const Is_Last_Message = (messages, index, UserId) => {
    if (index == messages.length - 1 &&
        messages[index].Sender._id !== UserId &&
        messages[index].Sender._id)
    return (
            <div>
               <img src={messages[index].Sender.Profile} style={{width:"2rem",height:"2rem",borderRadius:"50%"}}></img>
            </div>
    )
}