import React from "react";

export default function Settings({ open }) {
  return (
    <div
      className={`fixed bottom-0 h-[89vh] w-80 bg-white border z-10 ${
        open === "settings" ? "right-0" : "-right-[20rem]"
      } transition-all duration-500 p-4 flex flex-col justify-between`}
    >
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="flex items-center justify-between">
        <button className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center">
          Saqlash
        </button>
      </div>
    </div>
  );
}
