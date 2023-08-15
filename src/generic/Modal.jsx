import React from "react";

export default function Modal({ addFunc, closeModal, children }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white p-4 rounded shadow-lg flex flex-col gap-4 w-max ">
        <h2 className="text-xl font-bold mb-2">Modal Content</h2>
        {children}
        <div className="flex items-center gap-4 justify-end">
          <button
            onClick={addFunc}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            OK
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
