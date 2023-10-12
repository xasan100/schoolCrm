import React, { useState } from "react";
import { AiFillFileExcel } from "react-icons/ai";
import Modal from "../../generic/Modal";
import { toast } from "react-toastify";
import Exsel from "../../assets/icon/exsel.svg";
import FileUpload from "../FileUpload/FileUpload.jsx";
import { useCreateLessonExselMutation } from "../../redux/slice/lessonTable/LessonTableSlice.js";
export function ExselLessonCreate() {
  // state
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // create
  const [createUser, { isLoading }] = useCreateLessonExselMutation();

  const addData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('lessons_table', inputValue.fileInput);
    try {
      await createUser(formData);
      toast.success(`Exselda Qo'shildi`);
      setOpen(false);
    } catch (error) {
      toast.error("Exselda Qo'shishda xatolik bor", error.error);
    }
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="col-span-4">
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <img className="w-[40px] text-white h-5" src={Exsel} alt="exsel" />
        Jadval Qo'shish
      </button>
      {open && (
        <Modal
          title={<h1> Jadval Qo'shish</h1>}
          loader={isLoading}
          closeModal={onClose}
          addFunc={addData}
        >
          <div className="grid grid-cols-1 grid-rows-2 justify-centerc items-center w-full text-center">
            <FileUpload
              className="w-7 h-9"
              iconName={<AiFillFileExcel className="w-7" />}
              title="Yuklash"
              LabelFor="fileInput"
              setInputValue={setInputValue}
              inputValue={inputValue}
              acceptedFormats={[".xls", ".xlsx", ".xlsm", ".xlsb"]}

              fileType={"PNG, JPG, JPEG 5mb gacha"}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ExselLessonCreate;
