import React, { useState } from "react";
import { CgAddR } from "react-icons/cg";
import Modal from "../../generic/Modal";
import { useUpdateRoomMutation } from "../../redux/slice/rooms/RoomsCrud";
import { toast } from "react-toastify";
import { LuEdit2 } from "react-icons/lu";

export default function UpdateRoom({ object }) {
  const [name, setName] = useState(object.name);
  const [open, setOpen] = useState(false);
  const [updateRoom, { isLoading }] = useUpdateRoomMutation();
  const onClose = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRoom({ id: object.id, name });
      setName("");
      setOpen(false);
      toast.success("Xona o'zgartirildi");
    } catch (error) {
      toast.error(`Xona o'zgartirishda xatolik: ${error}`);
    }
  };
  return (
    <div className="col-span-3 ">
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="inline-flex justify-center items-center rounded-full bg-blue-500 p-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-400"
      >
        <LuEdit2 className="text-md" aria-hidden="true" />
      </button>
      {open && (
        <Modal closeModal={onClose} addFunc={handleSubmit} loader={isLoading}>
          <div>
            <h1>Xona nomi</h1>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
