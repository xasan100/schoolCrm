// src/App.js
import React, { useState } from "react";

function ChatCom() {
  const [messages, setMessages] = useState([
    { author: "Admin", text: "Salom! Qanday yordam bera olishim mumkin?" },
    { author: "Ota-Ona", text: ` Salom! Ma'lumotlarim haqida savolim bor. ` },
    { author: "Admin", text: "Tabiiyki, savolingizni bering." },
  ]);

  const [inputValue, setInputValue] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputValue) {
      setMessages([...messages, { author: "Admin", text: inputValue }]);
      setInputValue("");
    }
  };

  return (
    <div className="flex col-span-12">
      <div className="bg-white rounded-lg shadow-md p-6 w-full">
        <div className="overflow-y-auto h-[62vh] mb-4 border-b-2">
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg flex ${
                message.author === "Admin" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-md flex flex-col gap-1
                  ${
                    message.author === "Admin"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }
                `}
              >
                {message.text}
                <span className="font-bold">{message.author}</span>
              </div>
            </div>
          ))}
        </div>

        <form className="flex" onSubmit={sendMessage}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Xabarni kiriting..."
            className="flex-grow p-2 border rounded-lg mr-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Yuborish
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatCom;
