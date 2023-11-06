import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { MessageBox, Input, Button } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import { apiUrl } from '../../../api/Api.jsx';
import { useGetParentChatQuery } from '../../../redux/slice/chat/ChatCrud.js';

function ParentChatComponent() {
    const { data, isLoading, } = useGetParentChatQuery(undefined,{pollingInterval:3000});
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const chatContainerRef = useRef();
   // date    
    const get_date = (date) => {
        let date_message = new Date(date)
        const day = date_message.getDate();
        const month = date_message.getMonth() + 1;
        const hour = date_message.getHours();
        const minut = date_message.getMinutes();
        var times = `${hour}:${minut}`
        return `\t${hour}:${minut}`;
    }


    const handleSendMessage = () => {
        if (inputText) {
            const newMessage = {
                position: 'right',
                message: inputText,
                type: "question",
                text: inputText,
                date: new Date(),


            };

            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInputText('');

            const data = {
                message: inputText,
            };
            const token = sessionStorage.getItem("token");

            axios.post(`${apiUrl}parent_comments/add_comment/`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (data) {
            setMessages(data)
        }
    }, [data])
    useEffect(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages]);

    return (
        <div className='grid grid-cols-2 gap-5'>
            <div>
                <div
                    ref={chatContainerRef}
                    className='w-[400px] h-[600vh] overflow-y-auto'
                    style={{ maxHeight: '60vh' }}
                >
                    <MessageBox
                        position={'right'}
                        type={'text'}
                        // className='text-blue-500'
                        text="Assallomu Allekum Sizga Qanday Yordam Bera Olamiz"
                    />
                    {messages.map((message, index) => (
                        <MessageBox key={index} right
                            position={message.type === "question" ? 'right' : "left"}
                            className={message.type === "answer" && 'text-green-500'}


                            type={'text'} text={`${message.message} 
                          `}
                            date={message.date}
                        />
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

export default ParentChatComponent;
