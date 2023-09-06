import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../generic/Modal";
import { AiOutlineFileAdd } from "react-icons/ai";
import ImageUpload from "../ImageUpload/ImageUpload";
import { MdOutlineInsertPhoto } from "react-icons/md";
import FileUpload from "../FileUpload/FileUpload";
import { LuEdit2 } from "react-icons/lu";
import CustomInput from "react-phone-number-input/input";
import { useGetStudentsQuery, useUpdateStudentsMutation } from "../../redux/slice/students/students.js";

export default function UpdateStudent({ object }) {
  const [opne, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(object);
  const [updateTeacher, { isLoading, isSuccess }] = useUpdateStudentsMutation();
  console.log(inputValue,'object');

  const updateUser = () => {
    setInputValue({
      ...inputValue,
      user: {
        ...inputValue.user,
        username: "newUsername"
      }
    });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user.username', inputValue.user.username);
    formData.append('user.password', inputValue.password);
    formData.append('first_name', inputValue.first_name);
    formData.append('last_name', inputValue.last_name);
    formData.append('middle_name', inputValue.middle_name);
    formData.append('id_card', inputValue.id_card);
    formData.append('date_of_admission', inputValue.date_of_admission);
    formData.append('class', inputValue.class_of_school);
    formData.append('image', inputValue.img);
    formData.append('id_card_parents', inputValue.id_card_parents);
    formData.append('school_tab', inputValue.school_tab);
    formData.append('picture_3x4', inputValue.picture_3x4);
    formData.append('id', inputValue.id);

    try {
      await updateTeacher(formData);
      toast.success(`O'quvchi ${inputValue.first_name} O'zgartirildi`);

      setOpen(false);
    } catch (error) {
      toast.error("O'qituvchi o'zgartirishda xatolik xatolik", error.message);
    }
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-400"
      >
        <LuEdit2 className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
        Taxrirlash
      </button>
      {opne && (
        <Modal
          loader={isLoading}
          closeModal={onClose} addFunc={handleSubmit}>
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
                  onChange={(e) => setInputValue({ ...inputValue, user: { ...inputValue.user, username: e } })}
                  value={inputValue.user.username}
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
                  name="user.password"
                  type="text"
                  autoComplete="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={inputValue.password}
                  onChange={(e) => setInputValue({ ...inputValue, password: e.target.value })}
                // handleChange={handleChange}

                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="middle-name"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Qabul qilingan kun
              </label>
              <div className="mt-2">
                <input
                  value={inputValue.date_of_admission}
                  id="work-date"
                  name="date_of_employment"
                  type="date"
                  autoComplete="work-date"
                  required
                  onChange={(e) => setInputValue({ ...inputValue, date_of_admission: e.target.value })}

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
                  id="first-name"
                  name="first_name"
                  type="text"
                  value={inputValue.first_name}
                  autoComplete="first_name"
                  // handleChange={handleChange}
                  onChange={(e) => setInputValue({ ...inputValue, first_name: e.target.value })}
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
                  label="Familiya"
                  name="last_name"
                  type="text"
                  value={inputValue.last_name}
                  onChange={(e) => setInputValue({ ...inputValue, last_name: e.target.value })}
                  autoComplete="last-name"
                  // handleChange={handleChange}
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
                  label="Otasining Ismi"
                  id="middle-name"
                  name="middle_name"
                  type="text"
                  value={inputValue.middle_name}
                  autoComplete="middle-name"
                  // handleChange={handleChange}
                  onChange={(e) => setInputValue({ ...inputValue, middle_name: e.target.value })}
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
              onChange={(e) => setInputValue({ ...inputValue, img: e.target.value })}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <ImageUpload
              title={"Rasmingiz 3x4"}
              iconName={<MdOutlineInsertPhoto className="text-5xl" />}
              iconTitle={"Rasmni Yuklash"}
              fileType={"PNG, JPG, JPEG 5mb gacha"}
              LabelFor={"picture_3x4"}
              onChange={(e) => setInputValue({ ...inputValue, picture_3x4: e.target.value })}
              value={inputValue.picture_3x4}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <FileUpload
              title={"Id card parents"}
              iconName={<AiOutlineFileAdd className="text-2xl" />}
              LabelFor={"id_card_parents"}
              onChange={(e) => setInputValue({ ...inputValue, id_card_parents: e.target.value })}
              setInputValue={setInputValue}
              inputValue={inputValue}
              value={inputValue.id_card_parents}

            />
            <FileUpload
              title={"school_tab"}
              iconName={<AiOutlineFileAdd className="text-2xl" />}
              LabelFor={"school_tab"}
              onChange={(e) => setInputValue({ ...inputValue, school_tab: e.target.value })}
              setInputValue={setInputValue}
              inputValue={inputValue}
              value={inputValue.school_tab}
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
                  id="id_card"
                  name="id_card"
                  type="text"
                  value={inputValue.id_card}
                  onChange={(e) => setInputValue({ ...inputValue, id_card: e.target.value })}
                  autoComplete="id_card"
                  // handleChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="mt-2">

              <label htmlFor="">class of school</label>
              <select
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={inputValue.scince}
                id="science"
                name="science"
                value={inputValue.class_of_school}
                onChange={(e) => setInputValue({ ...inputValue, class_of_school: e.target.value })}
              >
                <option value="1">1</option>
                <option value="1">2</option>
                <option value="1">3</option>
                <option value="1">4</option>
                <option value="1">5</option>
                <option value="1">6</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
