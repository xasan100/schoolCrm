import React from "react";

export default function Modal({ addFunc, closeModal, children }) {
  return (
    <div className="fixed top-0 bottom-3/3 left-0 w-full h-full flex items-center justify-center bg-black/50 z-20">
      <div className="bg-white  p-4 rounded shadow-lg flex flex-col gap-4 w-2/1  ">
        <div className="flex justify-end">
          <p
            onClick={closeModal}
            className="cursor-pointer hover:text-red-500 duration-150 text-lg"
          >
            ✖︎
          </p>
        </div>
        {children}

        <div className="flex items-center gap-4 justify-end">
          <button
            onClick={addFunc}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Saqlash
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Orqaga
          </button>
        </div>
      </div>
    </div>
  );
}
