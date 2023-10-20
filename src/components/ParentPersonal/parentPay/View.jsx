import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import Modal from "../../../generic/Modal.jsx";
// import { useGetStudentsPaysQuery } from "../../../redux/slice/student_profile/StaffSlice.js";
import StduntsTablePayComponent from "./parentTablePay.jsx"
export default function View() {
  const [open, setOpen] = useState(false);
  // const { data } = useGetStudentsPaysQuery();
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
          <StduntsTablePayComponent/>
        </Modal>
      )}
    </div>
  );
}
