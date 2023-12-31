import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import Modal from "../../generic/Modal";
import { toast } from "react-toastify";
import { useDeleteRoomMutation } from "../../redux/slice/rooms/RoomsCrud";

export default function DeleteRoom({ ID }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const [deleteRoom, { isLoading }] = useDeleteRoomMutation();
  const handleDelete = async (id) => {
    try {
      await deleteRoom({ id });
      toast.success("Xona o'chirildi!");
      setIsOpen(false);
    } catch (err) {
      toast.error("Xona o'chirishda xatolik:", err);
    }
  };
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex justify-center items-center rounded-full bg-red-600 p-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <BsTrash className="text-md" aria-hidden="true" />
      </button>
      {isOpen && (
        <Modal
          addFunc={() => handleDelete(ID)}
          closeModal={closeModal}
          loader={isLoading}
          actionType={"delete"}
        >
          <div className="py-5 px-10 sx:p-5 sx:w-[80vw]">
            <h1 className="text-2xl font-bold text-red-600 text-center">
              Malumotni o'chirishga rozimisiz !!!
            </h1>
          </div>
        </Modal>
      )}
    </div>
  );
}
