import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import Modal from "../../generic/Modal";
import { toast } from "react-toastify";
import { useDeleteTaskMutation } from "../../redux/slice/task/TaskCrud";

export default function DeleteTask({ ID }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();
  const handleDelete = async (id) => {
    try {
      await deleteTask({ id });
      toast.success("Topshiriq o'chirildi!");
      setIsOpen(false);
    } catch (err) {
      toast.error("Topshiriqni o'chirishda xatolik:", err);
    }
  };
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center justify-center rounded-full bg-red-700 p-2 text-sm font-semibold text-white hover:text-black shadow-sm hover:bg-gray-300"
      >
        <BsTrash className="text-lg" aria-hidden="true" />
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
