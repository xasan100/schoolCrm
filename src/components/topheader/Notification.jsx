import React from "react";

export default function Notification({ skip }) {
  return (
    <div
      className={`fixed bottom-0 h-[89vh] w-80 bg-white border z-10 ${
        skip === "notification" ? "right-0" : "-right-[20rem]"
      } transition-all duration-500 p-4 flex flex-col justify-start gap-3`}
    >
      <h1 className="text-2xl font-bold">Message</h1>
      <div className="flex flex-col gap-2">
        <div className="bg-green-400 border rounded-md p-2">
          <p className="text-white">Assalomu aleykum</p>
        </div>
        <div className="bg-yellow-400 border rounded-md p-2">
          <p className="text-white">O'quvchining sentyabr oyi uchun qarzdor</p>
        </div>
        <div className="bg-red-400 border rounded-md p-2">
          <p className="text-white">O'qituvchi uchun oylik berildi</p>
        </div>
      </div>
    </div>
  );
}
