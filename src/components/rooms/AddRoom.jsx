import React, { useState } from "react";
import { CgAddR } from "react-icons/cg";
import Modal from "../../generic/Modal";

export default function AddRoom() {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(!open);
  };
  return (
    <div className="col-span-3 ">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center gap-2 py-4 border bg-white rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 duration-100 "
      >
        <CgAddR className="text-3xl" />
        <h1 className="font-semibold">Xona Qo'shish</h1>
      </div>
      {open && (
        <Modal closeModal={onClose}>
          <div>
            <h1>Xona nomi</h1>
            <input type="text" />
          </div>
        </Modal>
      )}
    </div>
  );
}
