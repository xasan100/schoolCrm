import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetTeachersQuery,
  useUpdateTeacherMutation,
} from "../../../redux/slice/teachers/TeachersSlice";
import Modal from "../../../generic/Modal";
import { AiOutlineFileAdd } from "react-icons/ai";
import ImageUpload from "../../ImageUpload/ImageUpload";
import { MdOutlineInsertPhoto } from "react-icons/md";
import FileUpload from "../../FileUpload/FileUpload";
import { LuEdit2 } from "react-icons/lu";
import { useEffect } from "react";
import CustomInput from "react-phone-number-input/input";
import InputField from "../../../generic/InputField";

export default function UpdateTeacher({ object }) {
  const [opne, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(object);
  const [updateTeacher, { isLoading, isSuccess }] = useUpdateTeacherMutation();
  const { data } = useGetTeachersQuery();
  const [error, setError] = useState({ sallery: "", username: "" });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (hasSubmitted) {
      if (isSuccess) {
        toast.success("O'qituvchi o'zgartirildi");
        setOpen(false);
      } else if (!isLoading && !isSuccess) {
        toast.error("O'qituvchi o'zgartirilmadi");
      }
    }
  }, [isSuccess, isLoading, hasSubmitted]);

  const updateNestedValue = (prev, keys, validatedValue) => ({
    ...prev,
    [keys[0]]: {
      ...prev[keys[0]],
      [keys[1]]: validatedValue,
    },
  });

  const handleUsernameChange = (e) => {
    const value = e;

    const isUsernameExists = data.some(
      (teacher) => teacher.user.username === value
    );

    setInputValue((prev) => ({
      ...prev,
      user: { ...prev.user, username: value },
    }));

    setError((prevError) => ({
      ...prevError,
      username: isUsernameExists ? "Ushbu username allaqachon mavjud!" : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numberPattern = /^[0-9]*$/;
    const keys = name.split(".");

    const newValue =
      keys.length === 2
        ? updateNestedValue(inputValue, keys, value)
        : { ...inputValue, [name]: value };

    setInputValue(newValue);

    if (name === "sallery") {
      setError((prevError) => ({
        ...prevError,
        sallery:
          numberPattern.test(value) || value === ""
            ? ""
            : "Iltimos faqat raqamlar ishlating",
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
      setHasSubmitted(true);
      await updateTeacher(formData);
      setInputValue();
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
        <Modal closeModal={onClose} addFunc={handleSubmit} loader={isLoading}>
          <div className="grid grid-rows-6 grid-cols-4 gap-2">
            <InputField
              label="Ism"
              id="first-name"
              name="first_name"
              type="text"
              value={inputValue.first_name}
              autoComplete="first_name"
              handleChange={handleChange}
            />
            <InputField
              label="Familiya"
              id="last-name"
              name="last_name"
              type="text"
              value={inputValue.last_name}
              autoComplete="last-name"
              handleChange={handleChange}
            />
            <InputField
              label="Otasining Ismi"
              id="middle-name"
              name="middle_name"
              type="text"
              value={inputValue.middle_name}
              autoComplete="middle-name"
              handleChange={handleChange}
            />
            <div className="col-span-1 row-span-1 relative">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Foydalanuvchi nomi
              </label>
              <div className="mt-2">
                <CustomInput
                  placeholder="Telfon raqamingiz kiriting qayta takrorlanmagan"
                  maxLength={13}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => handleUsernameChange(e)}
                  value={inputValue.user.username}
                />
              </div>
              {error.username && (
                <p className="text-red-600 absolute text-[12px] -bottom-3">
                  {error.username}
                </p>
              )}
            </div>
            <InputField
              label="Foydalanuvchi Paroli"
              id="password"
              name="user.password"
              type="text"
              value={inputValue.password}
              autoComplete="password"
              handleChange={handleChange}
            />
            <div className="col-span-1 row-span-1 relative">
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
                  value={inputValue.sallery}
                  autoComplete="sallery"
                  required
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {error.sallery && (
                <p className="text-red-600 absolute text-[12px] -bottom-3">
                  {error.sallery}
                </p>
              )}
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
              title={"Tarjimai Hol"}
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
              title={"086 Tibbiy Malumotnoma"}
              iconName={<AiOutlineFileAdd className="text-2xl" />}
              LabelFor={"medical_book"}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <FileUpload
              title={"Shaxsiy Rasmingiz"}
              iconName={<AiOutlineFileAdd className="text-2xl" />}
              LabelFor={"image"}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <InputField
              label="Manzil"
              id="address"
              name="address"
              type="text"
              value={inputValue.address}
              autoComplete="address"
              handleChange={handleChange}
            />
            <InputField
              label="Izoh"
              id="description"
              name="description"
              type="text"
              value={inputValue.description}
              autoComplete="description"
              handleChange={handleChange}
            />
            <InputField
              label="Tajriba"
              id="experience"
              name="experience"
              type="text"
              value={inputValue.experience}
              autoComplete="experience"
              handleChange={handleChange}
            />
            <InputField
              label="Passport yoki ID karta raqami"
              id="id_card"
              name="id_card"
              type="text"
              value={inputValue.id_card}
              autoComplete="id_card"
              handleChange={handleChange}
            />
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Jinsi
              </label>
              <div className="mt-2">
                <select
                  defaultValue={inputValue.gender}
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
                  defaultValue={inputValue.sallery_type}
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
                  value={inputValue.date_of_employment}
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
                  defaultValue={inputValue.scince}
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
