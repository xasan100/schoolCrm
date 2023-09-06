import React from "react";
import ButtonLoader from "../components/Loader/ButtonLoader";

export default function Modal({
  title,
  addFunc,
  closeModal,
  children,
  loader,
  actionType,
  isDisabled,
}) {
  const renderButton = (actionType, loader, addFunc) => {
    if (actionType === "view") {
      return null;
    }

    let buttonText;

    switch (actionType) {
      case "delete":
        buttonText = "O'chirish";
        break;
      case "update":
        buttonText = "O'zgartirish";
        break;
      default:
        buttonText = "Saqlash";
        break;
    }

    return (
      <button
        onClick={addFunc}
        disabled={isDisabled}
        className="disabled:bg-gray-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center"
      >
        {!loader ? (
          buttonText
        ) : (
          <ButtonLoader Color="white" Size={20} extraClass="h-6" />
        )}
      </button>
    );
  };

  return (
    <div className="fixed top-0 bottom-3/3 left-0 w-full h-full flex items-center justify-center z-20 bg-black/50">
      <div className="bg-white  p-4 rounded shadow-lg flex flex-col gap-4 w-2/1  sx:overflow-y-auto sx:h-[90vh]">
        <div className="flex  justify-between">
          <h1>{title}</h1>
          <p
            onClick={closeModal}
            className="cursor-pointer hover:text-red-500 duration-150 text-lg"
          >
            ✖︎
          </p>
        </div>
        {children}
        <div className="flex items-center gap-4 justify-end sx:justify-between">
          {renderButton(actionType, loader, addFunc)}
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
