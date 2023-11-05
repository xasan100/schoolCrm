import React, { useCallback, useEffect, useRef, useState } from "react";
import { MessageBox, Avatar } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { useGetParentsQuery } from "../../redux/slice/parents/ParentsCrud";
import { useGetChatQuery } from "../../redux/slice/chat/ChatCrud";

const ChatComponent = () => {
  const { data: parentsData, isLoading: parentsIsLoading } =
    useGetParentsQuery();
  const { data: chatData } = useGetChatQuery();

  console.log(parentsData, chatData);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "User 1",
      messages: [{ text: "Hello from User 1", fromUser: true }],
      avatar: "https://via.placeholder.com/40",
    },
    // ...
  ]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const filterUsers = useCallback(async () => {
    let result = users;
    if (search) {
      result = result.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredUsers(
      result.filter((user) => user.messages.length > 0 || search)
    );
  }, [users, search]);

  useEffect(() => {
    filterUsers();
    scrollToBottom();
  }, [filterUsers]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage && selectedUser) {
      const updatedUsers = users.map((user) => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            messages: [...user.messages, { text: newMessage, fromUser: true }],
          };
        }
        return user;
      });
      setUsers(updatedUsers);
      setNewMessage("");
    }
  };

  const getMessages = () => {
    const user = users.find((user) => user.id === selectedUser.id);
    return user ? user.messages : [];
  };

  return (
    <div className="flex h-[77vh] col-span-12">
      <div className="w-2/5 p-4 border-r border-gray-200 overflow-auto">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <ul>
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className={`flex items-center p-2 cursor-pointer ${
                selectedUser && selectedUser.id === user.id ? "bg-blue-100" : ""
              } hover:bg-blue-100`}
              onClick={() => handleUserClick(user)}
            >
              <Avatar
                src={user.avatar}
                alt={user.name}
                size="large"
                className="rounded-full overflow-hidden"
              />
              <span className="ml-4">{user.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/5 p-4">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-auto">
            {selectedUser &&
              getMessages().map((message, index) => (
                <MessageBox
                  key={index}
                  position={message.fromUser ? "right" : "left"}
                  type={"text"}
                  text={message.text}
                  title={selectedUser.name}
                />
              ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSendMessage}
            className="mt-4 flex items-center gap-5"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              //   onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
