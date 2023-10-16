import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineFileAdd, AiOutlineUserAdd } from "react-icons/ai";
import Modal from "../../generic/Modal";
import { useGetTeachersQuery } from "../../redux/slice/teachers/TeachersSlice";
import { toast } from "react-toastify";
import CustomInput from "react-phone-number-input/input";
import { useEffect } from "react";
import InputField from "../../generic/InputField";
import FileUpload from "../FileUpload/FileUpload";
import { memo } from "react";
import { useCreateStaffMutation } from "../../redux/slice/staff/StaffSlice.js";
const INITIAL_STATE = {
  user: {
    username: "",
    password: "",
    last_name: "",
    first_name: "",
    middle_name: "",
    image: "",
  },
  salary: null,
  position: "",
};

function AddStaff() {
  const [opne, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(INITIAL_STATE);
  const [createParent, { isLoading, isSuccess }] = useCreateStaffMutation();
  const [showPassword, setShowPassword] = useState(false);

  const { data } = useGetTeachersQuery();
  const [error, setError] = useState({ sallery: "", username: "" });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (hasSubmitted) {
      if (isSuccess) {
        toast.success("Xodim qo'shildi");
        setOpen(false);
      } else if (!isLoading && !isSuccess) {
        toast.error("Xodim qo'shilmadi");
      }
    }
  }, [isSuccess, isLoading, hasSubmitted]);

  // Inputdagi qiymatni olganda raqam yoki raqam emasligini tekshirish uchun qo'shimcha funksiya
  const updateNestedValue = (obj, keys, value) => {
    const newObj = { ...obj };
    let current = newObj;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    return newObj;
  };

  //Har bir inputga qiymat berilgan yoki berilmaganini tekshirish
  const isAnyFieldEmpty = (input) => {
    for (let key in input) {
      const value = input[key];

      if (typeof value === "object" && value !== null) {
        // null qiymatini "ob'ekt" sifatida hisoblamaslik uchun shart qo'shdim
        if (Array.isArray(value) && value.length === 0) {
          return true;
        }
        if (value instanceof File) {
          continue; // Faylni tekshirishni tashlab yuborish
        }
        if (isAnyFieldEmpty(value)) {
          // Ichidagi ob'ektlarni rekursiv tekshirish
          return true;
        }
      } else if (value === "" || value === null || value === undefined) {
        // Bo'sh qiymatlarni aniq tekshirish
        return true;
      }
    }
    return false;
  };

  const isDisabled = isAnyFieldEmpty(inputValue);

  //Faqatgina username inputidan qiymat olish chunki u boshqacha component
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

  //Har bir inputdan qiymat olish
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    const newValue =
      keys.length > 1
        ? updateNestedValue(inputValue, keys, value)
        : { ...inputValue, [name]: value };

    setInputValue(newValue);

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
      await createParent(formData);
      setInputValue(INITIAL_STATE);
      setHasSubmitted(false);
    } catch (error) {
      toast.error("Xodim qo'shishda xatolik", error.message);
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
        className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <AiOutlineUserAdd
          className="-ml-0.5 mr-1.5 text-xl"
          aria-hidden="true"
        />
        Xodim Qo'shish
      </button>
      {opne && (
        <Modal
          closeModal={onClose}
          addFunc={handleSubmit}
          loader={isLoading}
          isDisabled={isDisabled}
        >
          <div className="grid sm:grid-rows-6 grid-cols-2 sx:grid-cols-1 gap-2 relative">
            <InputField
              label="Ism"
              id="first-name"
              name="user.first_name"
              type="text"
              autoComplete="first_name"
              handleChange={handleChange}

            />
            <InputField
              label="Familiya"
              id="last-name"
              name="user.last_name"
              type="text"
              autoComplete="last-name"
              handleChange={handleChange}
            />
            <InputField
              label="Otasinig ismi"
              id="middle-name"
              name="user.middle_name"
              type="text"
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
                  maxLength={17}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => handleUsernameChange(e)}
                  value={inputValue.username}
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
              type={showPassword ? 'text' : 'password'}
              autoComplete="password"
              handleChange={handleChange}
              className='relative'
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2/4  pr-3 bottom-3/1 flex items-center cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEye
                  className="absolute top-[195px] text-xl right-4 cursor-pointer"
                />

              ) : (
                <AiOutlineEyeInvisible
                    className="absolute top-[195px] text-xl right-4 cursor-pointer"
                />
              )}
            </button>
            <div className="col-span-1 row-span-1 relative">
              <p>Oylik Maosh</p>

              <input
                id="salary"
                name="user.salary"
                type="text"
                autoComplete="salary"
                required
                pattern="[0-9]*" // Use a pattern to allow only numeric characters
                onChange={(e) => {
                  const inputValueCopy = { ...inputValue };
                  const inputSalary = e.target.value;
                  inputValueCopy.salary = inputSalary;
                  setInputValue(inputValueCopy);
                }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <span className="text-red-600" >
                {inputValue.salary !== null && isNaN(inputValue.salary)
                  ? <p className="text-red-600 absolute text-[12px] -bottom-2">Iltimos faqad raqam ishlating !</p>
                  : ''}
              </span>
            </div>
            <FileUpload
              title={"Rasmingiz"}
              iconName={<AiOutlineFileAdd className="text-2xl" />}
              setInputValue={setInputValue}
              LabelFor="user.image"
              inputValue={inputValue}
              acceptedFormats={[".png", ".jpeg", ".jpg", ".gif", ".bmp", ".tiff", ".webp", ".svg"]}

            />
            <InputField
              label="Lavozimi"
              id="position"
              name="position"
              type="text"
              autoComplete="position"
              handleChange={handleChange}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

const MemoizeAddStaff = memo(AddStaff);

export default MemoizeAddStaff;
