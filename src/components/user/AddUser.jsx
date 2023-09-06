import React, { useState } from "react";
import { AiOutlineFileAdd, AiOutlineUserAdd } from "react-icons/ai";
import Modal from "../../generic/Modal";
import ImageUpload from "../ImageUpload/ImageUpload";
import { MdOutlineInsertPhoto } from "react-icons/md";
import FileUpload from "../FileUpload/FileUpload";
import CustomInput from 'react-phone-number-input/input'
import { useCreateStudentMutation } from "../../redux/slice/students/students.js";
import { toast } from "react-toastify";

export function AddStudent() {
  const [open, setOpen] = useState(false); // Fixed the typo here
  const [createStudent, { isLoading, isSuccess }] = useCreateStudentMutation();

  const [inputValue, setInputValue] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    middleName: '',
    idCard: '',
    date: '',
    class_of_school: '',
    id_card_parents: '',
    picture_3x4: '',
    school_tab: '',
    img: '',
    deleteId: '',
  });

  const addData = async () => {
    const formData = new FormData();
    formData.append('user.username', inputValue.username);
    formData.append('user.password', inputValue.password);
    formData.append('first_name', inputValue.firstName);
    formData.append('last_name', inputValue.lastName);
    formData.append('middle_name', inputValue.middleName);
    formData.append('id_card', inputValue.idCard);
    formData.append('date_of_admission', inputValue.date);
    formData.append('class', inputValue.class_of_school);
    formData.append('image', inputValue.img);
    formData.append('id_card_parents', inputValue.id_card_parents);
    formData.append('school_tab', inputValue.school_tab);
    formData.append('picture_3x4', inputValue.picture_3x4);

    try {
      await createStudent(formData).unwrap();
      toast.success(`O'quvchi ${inputValue.firstName} qo'shildi`);

      setOpen(false);
    } catch (error) {
      toast.error("O'qituvchi qo'shilmadi");
      console.error('Failed to add student:', error);
    }
  }
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
        <AiOutlineUserAdd
          className="-ml-0.5 mr-1.5 text-xl"
          aria-hidden="true"
        />
        O'qituvchi Qo'shish
      </button>
      {open && (
        <Modal
          loader={isLoading}
          closeModal={onClose} addFunc={addData}>
          <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name="" id="">
            <option value="Hech biri">Hech biri</option>
            <option value="Admin">Admin</option>
            <option value="X">Hech biri</option>
            <option value="Hech biri">Hech biri</option>

          </select>
        </Modal>
      )}
    </div>
  );
}

export default AddStudent