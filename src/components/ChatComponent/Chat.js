import React from 'react';
import './Chat.css';
import ChatHeader from '../ChatHeaderComponent/ChatHeader';
import SendIcon from '@mui/icons-material/Send';
import Message from '../MessageComponent/Message';
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../../features/appSlice";
import { selectUser } from "../../features/userSlice";
import { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from "firebase/firestore";
import db from '../../serviceProvider/firebase';


function Chat() {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const[input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const messageEl = useRef(null);

    const sendMessage = (e) => {
        e.preventDefault();
        addDoc(collection(db, "channels", channelId, "messages"), {
            timestamp: serverTimestamp(),
            message: input,
            user: user,
        });
        setInput("");
    }

    useEffect(() => {
        if(channelId){
            let messagesDB = collection(db, 'channels', channelId, "messages");
            if(messagesDB){
                let q = query(messagesDB, orderBy("timestamp", "asc"));
                onSnapshot(q, (snapshot) => {
                    setMessages(snapshot.docs.map(doc => doc.data()))
                });
            }
        }
    }, [channelId]);

    useEffect(() => {
        if (messageEl) {
          messageEl.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
        }
      }, [])

  return( 
    <div className='chat'>
        <ChatHeader key={channelId} channelName={channelName} />

        <div className="chat_messages" ref={messageEl}>
            {messages.map((message) => (
                <Message 
                    timestamp={message.timestamp}
                    message={message.message}
                    user={message.user}
                />
            ))}
        </div>

        <div className="chat_input">
            <form>
                <input 
                    value={input} 
                    disabled={!channelId}
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder={`Message the -${channelName} channel`} 
                />
                <button 
                    className="chat_inputButton" 
                    type="submit"
                    disabled={!channelId}
                    onClick={sendMessage}
                >
                    Send Message
                </button>
            </form>
            <div 
                className="chat_sendButton"
                type="submit"
                disabled={!input}
                onClick={sendMessage}
            >
                <SendIcon />
            </div>
        </div>
    </div>
    );
}

export default Chat;
