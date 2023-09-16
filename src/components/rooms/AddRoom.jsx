import React, { useState } from "react";
import { CgAddR } from "react-icons/cg";
import Modal from "../../generic/Modal";
import { useCreateRoomMutation } from "../../redux/slice/rooms/RoomsCrud";
import { toast } from "react-toastify";

export default function AddRoom() {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const onClose = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRoom({ name });
      setName("");
      setOpen(false);
      toast.success("Xona qo'shildi");
    } catch (error) {
      toast.error(`Xona qo'shishda xatolik: ${error}`);
    }
  };
  return (
    <div className="col-span-3 ">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center gap-2 py-6 border bg-white rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 duration-100 "
      >
        <CgAddR className="text-2xl" />
        <h1 className="font-semibold">Xona Qo'shish</h1>
      </div>
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
