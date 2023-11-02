import React, { useEffect, useRef, useState } from "react";
import {
  useCreateChatMutation,
  useGetChatQuery,
} from "../../redux/slice/chat/ChatCrud";
import { useGetParentsQuery } from "../../redux/slice/parents/ParentsCrud";
import ButtonLoader from "../Loader/ButtonLoader";

function ChatCom() {
  const {
    data: chatData, isLoading: chatIsLoading,refetch,} = useGetChatQuery();
  const { data: parentsData, isLoading: parentsIsLoading } =
    useGetParentsQuery();
  const [createChat, {  createChatIsLoading }] =
    useCreateChatMutation();
  const [inputValue, setInputValue] = useState({
    message: "",
    parent: "",
    admin: 16078,
  });

  const [activeUser, setActiveUser] = useState({ messages: [] });

  const handleClick = (user) => {
    setInputValue({ ...inputValue, parent: user.parent.id });
    setActiveUser(user);
  };

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    try {
      await createChat(inputValue).unwrap();
      refetch();
    } catch (error) {
      
    }
    setInputValue({ ...inputValue, message: "" });
  };

  return (
    <div className="flex col-span-12">
      <UserList
        data={chatData}
        isLoading={chatIsLoading}
        activeUser={activeUser}
        handleClick={handleClick}
        parents={parentsData}
        parentsIsLoading={parentsIsLoading}
        setInputValue={setInputValue}
        sendMessage={sendMessage}
        inputValue={inputValue}
      />
      <MessageArea
        activeUser={activeUser}
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendMessage={sendMessage}
        createChatIsLoading={createChatIsLoading}
        refetch={refetch}
      />
    </div>
  );
}

const UserList = ({
  data,
  isLoading,
  activeUser,
  handleClick,
  parents,
  parentsIsLoading,
  setInputValue,
  sendMessage,
  inputValue,
}) => {
  const [prevParentValue, setPrevParentValue] = useState(inputValue.parent);

  const handleSelectChange = (e) => {
    // Joriy qiymatni oldingi qiymatga o'zgartirish:
    setPrevParentValue(inputValue.parent);
    // Yangi qiymatni inputValue o'zgaruvchisiga o'zgartirish:
    setInputValue({ ...inputValue, parent: +e.target.value });
  };

  useEffect(() => {
    // inputValue.parent o'zgarganda va o'zgarish oldingi qiymatdan farqli bo'lganda:
    if (inputValue.parent !== prevParentValue) {
      sendMessage();
    }
  }, [inputValue.parent]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-1/4 flex flex-col gap-2">
      <h2 className="text-xl mb-2">Foydalanuvchilar</h2>
      <select
        id="language_certificate"
        name="language_certificate"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 text-lg focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        onChange={handleSelectChange}
      >
        <option value="0">Hech Qanday</option>
        {parentsIsLoading
          ? null
          : parents.map((parent) => (
              <option key={parent.id} value={parent.id}>
                {parent.user?.username}
              </option>
            ))}
      </select>
      <ul className="overflow-y-auto h-[55vh]">
        {isLoading ? (
          <div>Yuklanmoqda ...</div>
        ) : (
          data
            .filter((user) => user.messages && user.messages.length > 0) // Faqat messages bor bo'lgan userlarni tanlaymiz
            .map((user) => (
              <li
                key={user.parent.id}
                className={`
            mb-2 cursor-pointer p-2 rounded-md
            ${
              activeUser?.parent?.id === user?.parent.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-blue-300"
            }
          `}
                onClick={() => handleClick(user)}
              >
                {user?.parent.user.username}
              </li>
            ))
        )}
      </ul>
    </div>
  );
};

const MessageArea = ({
  activeUser,
  inputValue,
  setInputValue,
  sendMessage,
  createChatIsLoading,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeUser.messages]);
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-3/4 ml-4">
      <div className="overflow-y-auto h-[62vh] mb-4 border-b-2">
        {activeUser && activeUser.messages && activeUser.messages.length > 0 ? (
          activeUser.messages.map((m, index) => (
            <div
              ref={messagesEndRef}
              key={index}
              className={`mb-2 p-2 rounded-lg flex ${
                m.type === "answer" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-md flex flex-col gap-1
      ${m.type === "answer" ? "bg-blue-500 text-white" : "bg-gray-300"}
    `}
              >
                {m.message}
                <span className="font-bold">{m.author}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-full items-center justify-center">
            <h1 className="text-lg font-semibold">
              Xabar yuborish uchun suhbatni tanlang
            </h1>
          </div>
        )}
      </div>

      <form className="flex" onSubmit={sendMessage}>
        <input
          value={inputValue.message}
          onChange={(e) =>
            setInputValue({ ...inputValue, message: e.target.value })
          }
          type="text"
          placeholder="Xabarni kiriting..."
          className="flex-grow p-2 border rounded-lg mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
          {createChatIsLoading ? (
            <ButtonLoader Color="white" Size={20} extraClass="h-6" />
          ) : (
            "Yuborish"
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatCom;
