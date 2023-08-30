import React, { useState } from "react";
import { AiOutlineFileAdd, AiOutlineUserAdd } from "react-icons/ai";
import Modal from "../../generic/Modal";
import ImageUpload from "../ImageUpload/ImageUpload";
import { MdOutlineInsertPhoto } from "react-icons/md";
import FileUpload from "../FileUpload/FileUpload";
import { useCreateTeacherMutation } from "../../redux/slice/teachers/TeachersSlice";
import { toast } from "react-toastify";

const INITIAL_STATE = {
  user: {
    username: "",
    password: "",
  },
  first_name: "",
  last_name: "",
  middle_name: "",
  id_card: "",
  sallery_type: "",
  sallery: 0,
  date_of_employment: "",
  gender: "",
  address: "",
  description: "",
  experience: "",
  language_certificate: "",
  science: 0,
  image: "",
  lens: "",
  id_card_photo: "",
  survey: "",
  biography: "",
  medical_book: "",
  picture_3x4: "",
};

export default function AddTeacher() {
  const [opne, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(INITIAL_STATE);
  const [createTeacher, { isSuccess }] = useCreateTeacherMutation();
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Split the name by '.' to determine if updating a nested property
    const keys = name.split(".");

    if (keys.length === 2) {
      setInputValue((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setInputValue((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let key in inputValue) {
      if (key === "user") {
        for (let userKey in inputValue[key]) {
          formData.append(`user.${userKey}`, inputValue[key][userKey]);
        }
      } else {
        formData.append(key, inputValue[key]);
      }
    }
    try {
      await createTeacher(formData);
      toast.success("O'qituvchi qo'shildi!");
    } catch (err) {
      toast.error("O'qtuvchi qo'shildi:", err);
    }
    setOpen(false); // Assuming you've imported and defined `dispatch` somewhere
  };

  const onClose = () => {
    setOpen(false);
  };

  console.log(isSuccess);
  return (
    <div>
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
        <Modal closeModal={onClose} addFunc={handleSubmit} loader={isSuccess}>
          <div className="grid grid-rows-6 grid-cols-4 gap-2">
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Ism
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first_name"
                  type="text"
                  autoComplete="first_name"
                  required
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Familiya
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last_name"
                  type="text"
                  autoComplete="last-name"
                  required
                  onChange={(e) => handleChange(e)}
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
                  type="text"
                  autoComplete="middle-name"
                  required
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Foydalanuvchi nomi
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="user.username"
                  type="text"
                  autoComplete="username"
                  required
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Foydalanuvchi paroli
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="user.password"
                  type="text"
                  autoComplete="password"
                  required
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="salary"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Maosh
              </label>
              <div className="mt-2">
                <input
                  id="salary"
                  name="sallery"
                  type="text"
                  autoComplete="salary"
                  required
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <ImageUpload
              title={"Passport yoki ID karta rasmi"}
              iconName={<MdOutlineInsertPhoto className="text-5xl" />}
              iconTitle={"Rasmni Yuklash"}
              fileType={"PNG, JPG, JPEG 5mb gacha"}
              LabelFor={"id_card_photo"}
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
              title={"Til Sertifikati"}
              iconName={<AiOutlineFileAdd className="text-2xl" />}
              LabelFor={"language_certificate"}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <FileUpload
              title={"Tarjimai hol"}
              iconName={<AiOutlineFileAdd className="text-2xl" />}
              LabelFor={"biography"}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <FileUpload
              title={"Obyektivka"}
              iconName={<AiOutlineFileAdd className="text-2xl" />}
              LabelFor={"lens"}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <FileUpload
              title={"So'rovnoma"}
              iconName={<AiOutlineFileAdd className="text-2xl" />}
              LabelFor={"survey"}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <FileUpload
              title={"086 tibbiy malumotnoma"}
              iconName={<AiOutlineFileAdd className="text-2xl" />}
              LabelFor={"medical_book"}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  required
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Izoh
              </label>
              <div className="mt-2">
                <input
                  id="description"
                  name="description"
                  type="text"
                  autoComplete="description"
                  required
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="experience"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Tajriba
              </label>
              <div className="mt-2">
                <input
                  id="experience"
                  name="experience"
                  type="text"
                  autoComplete="experience"
                  required
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="id_card"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Passport yoki ID karta raqami
              </label>
              <div className="mt-2">
                <input
                  id="id_card"
                  name="id_card"
                  type="text"
                  autoComplete="id_card"
                  required
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="position"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Lavozimi
              </label>
              <div className="mt-2">
                <input
                  id="position"
                  name="position"
                  type="text"
                  autoComplete="position"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Jinsi
              </label>
              <div className="mt-2">
                <select
                  id="gender"
                  name="gender"
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="MALE">Erkak</option>
                  <option value="FEMALE">Ayol</option>
                </select>
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="sallery_type"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Oylik Turi
              </label>
              <div className="mt-2">
                <select
                  id="sallery_type"
                  name="sallery_type"
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="FIXED">Doimiy</option>
                  <option value="PER_HOURS">Soatbay</option>
                </select>
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="work-date"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Ishga qabul qilingan kun
              </label>
              <div className="mt-2">
                <input
                  id="work-date"
                  name="date_of_employment"
                  type="date"
                  autoComplete="work-date"
                  required
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="science"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Fan
              </label>
              <div className="mt-2">
                <select
                  id="science"
                  name="science"
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="0">Hech qanday</option>
                  <option value="1">Ona tili</option>
                  <option value="2">Ingiliz tili</option>
                  <option value="3">Rus tili</option>
                </select>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
