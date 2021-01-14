import React from 'react';

function ChatMessageHistory({messages}) {   
    const createMessage = (message, index) => {
        const liStyles = {
           backgroundColor: ( index % 2 === 1 ) ? '#ddd' : '#efefef',
           padding: '2px',
           borderBottom: '1px solid #ddd',
           color: 'black'
        };  
        let name = message.talker;
        if (message.talker.indexOf(" ")!==-1)
        {
            name = message.talker.substring(message.talker.indexOf(" "));
        }
        
        return (<li style={liStyles}>
            <p style={{marginBottom: 0}}>{`${name}: ${message.message}`}</p>
            </li>)
     };
        
     const ulStyles = {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        
     };
     
     return <ul style={ulStyles}>{messages.map(createMessage)}</ul>;
}

export default ChatMessageHistory;
