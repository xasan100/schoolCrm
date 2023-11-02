import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { MessageBox, Input, Button } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import { apiUrl } from '../../api/Api.jsx';

function ChatComponent() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const chatContainerRef = useRef();

    const handleSendMessage = () => {
        if (inputText) {
            const newMessage = {
                position: 'right',
                type: 'text',
                text: inputText,
                date: new Date(),
            };

            setMessages([...messages, newMessage]);
            setInputText('');
        }
        const data = {
            message: inputText,
        };
        axios.post(`${apiUrl}/parent_comments/add_comment/`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log("Response data:", response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            handleSendMessage();
        }

    };

    useEffect(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages]);

    return (
        <div className='grid grid-cols-2 gap-5'>

            <div>
                <div
                    ref={chatContainerRef}
                    className='w-[400px] h-[600px] overflow-y-auto'
                    style={{ maxHeight: '600px',  }}
                >
                    <MessageBox
                        position={'left'}
                        type={'text'}
                        text="Assallomu Allekum Sizga Qanday Yordam Bera Olamiz"
                    />
                    {messages.map((message, index) => (
                        <MessageBox key={index} {...message} />
                    ))}
                </div>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                    <Input
                        className='w-full'
                        placeholder="Type a message..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyPress}
                        rightButtons={
                            <Button
                                color="white"
                                backgroundColor="black"
                                text="Send"
                                onClick={handleSendMessage}
                            />
                        }
                    />
                </div>
            </div>

        </div>
    );
}

export default ChatComponent;
