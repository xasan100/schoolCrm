import React from "react";
import ChatParentCom from "../components/ChatParent/chatParent.jsx";

export const ChatParentPage = () => {
  return (
    <div className="grid gap-4 grid-cols-12 p-4">
      <h1 className="text-2xl font-bold col-span-12">Yozishmalar</h1>
      <ChatParentCom />
    </div>
  );
};

export default ChatParentPage;
