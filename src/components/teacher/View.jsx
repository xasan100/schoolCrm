import React, { useState } from "react";
import Modal from "../../generic/Modal";
import { AiOutlineEye } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";

export default function View({ object }) {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(!open);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <AiOutlineEye className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
        Ko'rish
      </button>
      {open && (
        <Modal closeModal={onClose} actionType="view">
          <div className="w-[50vw] p-4">
            <div className="flex w-full h-full items-stretch">
              <div className="w-1/3 p-2 h-full">
                {/* Left column for avatar, etc. */}
                <div className="bg-white rounded-lg shadow-lg border p-4">
                  {object?.image && object.image !== "" ? (
                    <img
                      src={object.image}
                      alt="avatar"
                      className="mx-auto rounded-full w-40 h-40 object-cover"
                    />
                  ) : (
                    <div className="w-40 h-40 rounded-full border bg-gray-200 flex justify-center items-center">
                      <FaUserTie className="text-7xl text-primary" />
                    </div>
                  )}

                  <h2 className="mt-4 text-center font-bold truncate">
                    {object.first_name}
                  </h2>
                  <h2 className="mt-1.5 text-center font-bold truncate">
                    {object.last_name}
                  </h2>
                </div>
              </div>
              <div className="w-2/3 p-2 h-full">
                <div className="bg-white rounded-lg shadow-lg border p-4">
                  <h2 className="text-xl mb-2">Barcha malumotlar</h2>
                  <p>
                    <strong>Foydalanuvchi nomi:</strong> {object.user.username}
                  </p>
                  <p>
                    <strong>Ismi:</strong> {object.first_name}
                  </p>
                  <p>
                    <strong>Familiyasi:</strong> {object.last_name}
                  </p>
                  <p>
                    <strong>Jinsi:</strong> {object.gender}
                  </p>
                  <p>
                    <strong>Manzili:</strong> {object.address}
                  </p>
                  <p>
                    <strong>Tajribasi:</strong> {object.experience}
                  </p>
                  <p>
                    <strong>Maosh:</strong> {object.sallery}
                  </p>
                  <p>
                    <strong>Maosh turi:</strong> {object.sallery_type}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
