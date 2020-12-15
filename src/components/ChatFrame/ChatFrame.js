import ChatMessageHistory from './ChatMessage/ChatMessage';
import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Button} from 'react-bootstrap';
 const MESSAGES = [
    { message: 'Hi Josh', name: 'Tuesday' },
    { message: 'How are you?', name: 'Wednesday' }                                    
 ];

 
 function ChatFrame() {

    const {fullname} = useSelector(state => ({
        fullname: state.auth.fullname
    }));

    const [messages, setMessages] = useState( [
        { message: 'Hi Josh', name: 'Tuesday' },
        { message: 'How are you?', name: 'Wednesday' }                                    
     ]);

    const [inputText, setinputText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const nextMessages = messages.concat([{ message: inputText, fullname }]);
        const nextInputText = '';
        this.setState({ messages: nextMessages, inputText: nextInputText });
     };

    const windowStyles = {
           maxWidth: '40em',
           margin: '1rem auto'
    };
        
    const formStyles = {
           display: 'flex',
        };
        
    const inputStyles = {
           flex: '1 auto'
        };

    return (
        <div style={windowStyles}>
           <ChatMessageHistory messages={messages} />
           <form style={formStyles} onSubmit={handleSubmit}>
              <input style={inputStyles} type="text" onChange={(e) => setinputText(e.target.value)} 
              value={inputText} />
              <Button variant="primary">Send</Button>
           </form>
        </div>
     );
 }
 
 export default ChatFrame;
 
 