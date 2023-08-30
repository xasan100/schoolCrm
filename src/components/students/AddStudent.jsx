import React, { useState } from "react";
import { AiOutlineFileAdd, AiOutlineUserAdd } from "react-icons/ai";
import Modal from "../../generic/Modal";
import ImageUpload from "../ImageUpload/ImageUpload";
import { MdOutlineInsertPhoto } from "react-icons/md";
import FileUpload from "../FileUpload/FileUpload";
import { useDispatch } from "react-redux";
import { StudentsPost } from "../../redux/slice/students/studentsPost/index.jsx";
import { StudentsGet } from "../../redux/slice/students/studentsGet/index.jsx";
import CustomInput from 'react-phone-number-input/input'

export default function AddStudent() {
  const [opne, setOpen] = useState(false);
  const dispatch = useDispatch();

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
  const addData = () => {
    const formData = new FormData()
    formData.append('user.username', inputValue.username)
    formData.append('user.password', inputValue.password)
    formData.append('first_name', inputValue.firstName)
    formData.append('last_name', inputValue.lastName)
    formData.append('middle_name', inputValue.middleName)
    formData.append('id_card', inputValue.idCard)
    formData.append('date_of_admission', inputValue.date)
    formData.append('class', inputValue.class_of_school)
    formData.append('image', inputValue.img)
    formData.append('id_card_parents', inputValue.id_card_parents)
    formData.append('school_tab', inputValue.school_tab)
    formData.append('picture_3x4', inputValue.picture_3x4)
    dispatch(StudentsPost(formData));
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
      {opne && (
        <Modal closeModal={onClose} addFunc={addData}>
          <div className="grid grid-rows-6 grid-cols-4 gap-2">
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Telfon Raqam
              </label>
              <div className="mt-2">
                <CustomInput
                  placeholder='Telfon raqamingiz kiriting qayta takrorlanmagan'
                  maxLength={17}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setInputValue({ ...inputValue, username: e })}
                  value={inputValue.username}
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Parol Yarating
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last_name"
                  type="password"
                  autoComplete="last-name"
                  required
                  onChange={(e) => setInputValue({ ...inputValue, password: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="middle-name"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Otasining ismi
              </label>
              <div className="mt-2">
                <input
                  id="middle-name"
                  name="middle_name"
                  type="date"
                  autoComplete="middle-name"
                  required
                  onChange={(e) => setInputValue({ ...inputValue, date: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="user.username"
                  type="text"
                  autoComplete="username"
                  required
                  onChange={(e) => setInputValue({ ...inputValue, firstName: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="user.password"
                  type="text"
                  autoComplete="password"
                  required
                  onChange={(e) => setInputValue({ ...inputValue, lastName: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="salary"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Middle Name
              </label>
              <div className="mt-2">
                <input
                  id="salary"
                  name="sallery"
                  type="text"
                  autoComplete="salary"
                  required
                  onChange={(e) => setInputValue({ ...inputValue, middleName: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>


            </div>
            <ImageUpload
              title={"IMG"}
              iconName={<MdOutlineInsertPhoto className="text-5xl" />}
              iconTitle={"Rasmni Yuklash"}
              fileType={"PNG, JPG, JPEG 5mb gacha"}
              LabelFor={"img"}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <ImageUpload
              title={"Rasmingiz 3x4"}
              iconName={<MdOutlineInsertPhoto className="text-5xl" />}
              iconTitle={"Rasmni Yuklash"}
              fileType={"PNG, JPG, JPEG 5mb gacha"}
              LabelFor={"picture_3x4"}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <FileUpload
              title={"Id card parents"}
              iconName={<AiOutlineFileAdd className="text-2xl" />}
              LabelFor={"id_card_parents"}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <FileUpload
              title={"school_tab"}
              iconName={<AiOutlineFileAdd className="text-2xl" />}
              LabelFor={"school_tab"}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                id card
              </label>
              <div className="mt-2">
                <input
                  id="description"
                  name="description"
                  type="text"
                  autoComplete="description"
                  required
                  onChange={(e) => setInputValue({ ...inputValue, idCard: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="mt-2">

              <label htmlFor="">class of school</label>
              <select
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setInputValue({ ...inputValue, class_of_school: e.target.value })} >
                <option value="1">1</option>
                <option value="1">1</option>
                <option value="1">1</option>
                <option value="1">1</option>
                <option value="1">1</option>
                <option value="1">1</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
