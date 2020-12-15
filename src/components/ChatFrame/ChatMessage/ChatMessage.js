import React from 'react'

function ChatMessage({message, name}) {
    return (
        <>
        <p>{name}</p>
        <p style={{marginBottom: 0}}>{message}</p>
        </>
    )
}

export default ChatMessage;

