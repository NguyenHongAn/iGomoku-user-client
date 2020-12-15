import ChatMessageHistory from './ChatMessageHistory/ChatMessageHistory';
import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Button} from 'react-bootstrap';
 
function ChatFrame() {

    const {fullname} = useSelector(state => ({
        fullname: state.auth.fullname
    }));

    const [messages, setMessages] = useState( [
        { message: 'Hi Josh', fullname: 'Tuesday' },
        { message: 'How are you?', fullname: 'Wednesday' },    
        { message: 'How are you?', fullname: 'Wednesday' } ,           
        { message: 'How are you?', fullname: 'Wednesday' }  ,          
        { message: 'How are you?', fullname: 'Wednesday' },            
        { message: 'How are you?', fullname: 'Wednesday' },            
        { message: 'How are you?', fullname: 'Wednesday' }  ,          
        { message: 'How are you?', fullname: 'Wednesday' }  ,    
        { message: 'How are you?', fullname: 'Wednesday' }  ,    
        { message: 'How are you?', fullname: 'Wednesday' }  ,    
        { message: 'How are you?', fullname: 'Wednesday' }  ,    
        { message: 'How are you?', fullname: 'Wednesday' }  ,    
        { message: 'How are you?', fullname: 'Wednesday' }  ,    
        { message: 'How are you?', fullname: 'Wednesday' }  ,    
        { message: 'How are you?', fullname: 'Wednesday' }  ,    
        { message: 'How are you?', fullname: 'Wednesday' }  ,    
        { message: 'How are you?', fullname: 'Wednesday' }  ,                                   
        { message: 'How are you?', fullname: 'Wednesday' }  ,    
        { message: 'How are you?', fullname: 'Wednesday' }  ,    
        { message: 'How are you?', fullname: 'Wednesday' }  ,    
        { message: 'How are you?', fullname: 'Wednesday' }  ,    
        { message: 'How are you?', fullname: 'Wednesday' }  ,    
        { message: 'How are you?', fullname: 'Wednesday' }  ,    
     ]);

    const [inputText, setinputText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const nextMessages = messages.concat([{ message: inputText, fullname }]);
        const nextInputText = '';
        console.log(nextMessages);
        setMessages(nextMessages);
        setinputText(nextInputText);
     };

    const windowStyles = {
           width: '100%',
    };
        
    const formStyles = {
           display: 'flex',
        };
        
    const inputStyles = {
          flex: '1 auto'
        };
    
    const scrollDiv ={
        overflow: "auto",
        height: "320px",
    }
    return (
        <div style={windowStyles}>
            <div style={scrollDiv}>
                <ChatMessageHistory messages={messages} />
            </div>
           
           <form style={formStyles} onSubmit={handleSubmit}>
              <input style={inputStyles} type="text" onChange={(e) => setinputText(e.target.value)} 
              value={inputText} />
              <Button variant="primary" type="submit">Send</Button>
           </form>
        </div>
     );
 }
 
 export default ChatFrame;
 
 