// src/App.js
import React, { useState } from 'react';


function ChatCom() {
  const [messages, setMessages] = useState([
    { author: 'you', text: 'Salom! Qanday yordam bera olishim mumkin?' },
    { author: 'user', text: ` Salom! Ma'lumotlarim haqida savolim bor. ` },
    { author: 'you', text: 'Tabiiyki, savolingizni bering.' }
  ]);

  const [inputValue, setInputValue] = useState('');

  const sendMessage = () => {
    if (inputValue) {
      setMessages([...messages, { author: 'user', text: inputValue }]);
      setInputValue('');
    }
  };

  return (
    <div className="flex   bg-gray-200">
      <div className="bg-white w-96 rounded-lg shadow-md p-6">
        <div className="overflow-y-auto h-72 mb-4 border-b-2">
          {messages?.map((message, index) => (
            <div key={index} className={`mb-2 p-2 rounded-lg ${message.author === 'you' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
              {message.text}
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Xabarni kiriting..."
            className="flex-grow p-2 border rounded-lg mr-2"
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-lg">
            Yuborish
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatCom;
