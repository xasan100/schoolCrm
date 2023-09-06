import React, { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import Modal from "../../generic/Modal";
import ImageUpload from "../ImageUpload/ImageUpload";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { useGetTeachersQuery } from "../../redux/slice/teachers/TeachersSlice";
import { toast } from "react-toastify";
import CustomInput from "react-phone-number-input/input";
import { useEffect } from "react";
import InputField from "../../generic/InputField";
import { useUpdateStaffMutation } from "../../redux/slice/staff/StaffSlice";
import { LuEdit2 } from "react-icons/lu";

export default function UpdateStaff({ object }) {
  const [opne, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(object);
  const [updateStaff, { isLoading, isSuccess }] = useUpdateStaffMutation();
  const { data } = useGetTeachersQuery();
  const [error, setError] = useState({ sallery: "", username: "" });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (hasSubmitted) {
      if (isSuccess) {
        toast.success("Xodim o'zgartirildi");
        setOpen(false);
      } else if (!isLoading && !isSuccess) {
        toast.error("Xodim o'zgartirilmadi");
      }
    }
  }, [isSuccess, isLoading, hasSubmitted]);

  // Inputdagi qiymatni olganda raqam yoki raqam emasligini tekshirish uchun qo'shimcha funksiya
  const updateNestedValue = (prev, keys, validatedValue) => ({
    ...prev,
    [keys[0]]: {
      ...prev[keys[0]],
      [keys[1]]: validatedValue,
    },
  });

  //Har bir inputga qiymat berilgan yoki berilmaganini tekshirish
  const isAnyFieldEmpty = (input) => {
    for (let key in input) {
      const value = input[key];

      if (typeof value === "object") {
        if (Array.isArray(value) && value.length === 0) {
          return true;
        }
        if (value instanceof File) {
          continue; // Fayl tekshiruvini oʻtkazib yuborish
        }
        for (let innerKey in value) {
          if (!value[innerKey] && value[innerKey] !== 0) {
            return true;
          }
        }
      } else {
        if (!value && value !== 0) {
          return true;
        }
      }
    }
    return false;
  };

  const isDisabled = isAnyFieldEmpty(inputValue);

  //Faqatgina username inputidan qiymat olish chunki u boshqacha component
  const handleUsernameChange = (e) => {
    const value = e;
    const isUsernameExists = data.some(
      (staff) => staff.user.username === value
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

  //Har bir inputdan qiymat olish
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

  //O'qituvchi qo'shish
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
      await updateStaff(formData);
      setInputValue(inputValue);
      setHasSubmitted(false);
    } catch (error) {
      toast.error("Xodim o'zgartirishda xatolik", error.message);
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
          closeModal={onClose}
          addFunc={handleSubmit}
          loader={isLoading}
          isDisabled={isDisabled}
        >
          <div className="grid sm:grid-rows-6 grid-cols-2 sx:grid-cols-1 gap-2">
            <InputField
              value={inputValue.first_name}
              label="Ism"
              id="first-name"
              name="first_name"
              type="text"
              autoComplete="first_name"
              handleChange={handleChange}
            />
            <InputField
              value={inputValue.last_name}
              label="Familiya"
              id="last-name"
              name="last_name"
              type="text"
              autoComplete="last-name"
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
                  maxLength={17}
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
              value={inputValue.user.password}
              label="Foydalanuvchi Paroli"
              id="password"
              name="user.password"
              type="text"
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
                  value={inputValue.salary}
                  id="salary"
                  name="salary"
                  type="text"
                  autoComplete="salary"
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
              title={"Rasmingiz"}
              iconName={<MdOutlineInsertPhoto className="text-5xl" />}
              iconTitle={"Rasmni Yuklash"}
              fileType={"PNG, JPG, JPEG 5mb gacha"}
              LabelFor={"image"}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <InputField
              value={inputValue.lavozim}
              label="Lavozimi"
              id="lavozim"
              name="lavozim"
              type="text"
              autoComplete="lavozim"
              handleChange={handleChange}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
