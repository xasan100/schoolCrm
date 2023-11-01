import React, { useState } from "react";
import Modal from "../../generic/Modal";
import { AiOutlineCalculator, AiOutlineEye } from "react-icons/ai";
import { useGetStudenDebtsQuery } from "../../redux/slice/students/studentsdepts.js";

export default function DebtesCom({ ID }) {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(!open);
  const { data, isLoading } = useGetStudenDebtsQuery({ id: ID });

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="inline-flex gap-2 items-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-400"
      >
        <AiOutlineCalculator />
        Qarzdorlik
      </button>
      {open && (
        <Modal closeModal={onClose} actionType="view">
          <div className="w-[90vw] h-[80vh] p-4">
            <h1>Hello World</h1>
          </div>
        </Modal>
      )}
    </div>
  );
}
