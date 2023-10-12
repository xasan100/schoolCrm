import React, { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUserAdd,
} from "react-icons/ai";
import Modal from "../../generic/Modal";
import { toast } from "react-toastify";
import CustomInput from "react-phone-number-input/input";
import { useEffect } from "react";
import InputField from "../../generic/InputField";
import { memo } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useGetStudentsQuery } from "../../redux/slice/students/students";
import { useCreateParentMutation } from "../../redux/slice/parents/ParentsCrud";
import { useGetAllUserNameQuery } from "../../redux/slice/checkUsername/CheckUsername";

const INITIAL_STATE = {
  user: {
    username: "",
    password: "",
    last_name: "",
    first_name: "",
    middle_name: "",
  },
  children: [],
};

function AddParent() {
  const [opne, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(INITIAL_STATE);
  const [createParent, { isLoading, isSuccess }] = useCreateParentMutation();
  const [skip, setSkip] = useState(true);
  const { data } = useGetStudentsQuery();
  const { data: allUserName } = useGetAllUserNameQuery(
    inputValue.user.username,
    { skip }
  );
  const [show, setShow] = useState(false);
  const [error, setError] = useState({ password: "" });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (hasSubmitted) {
      if (isSuccess) {
        toast.success("Ma'lumot qo'shildi");
        setOpen(false);
      } else if (!isLoading && !isSuccess) {
        toast.error("Ma'lumot qo'shilmadi");
      }
    }
  }, [isSuccess, isLoading, hasSubmitted]);

  // Inputdagi qiymatni olganda raqam yoki raqam emasligini tekshirish uchun qo'shimcha funksiya
  const updateNestedValue = (obj, keys, value) => {
    const newObj = { ...obj }; // ob'ektning nusxasini olamiz
    let current = newObj;

    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] }; // nusxalar yordamida yangi ob'ekt yaratamiz
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

    setInputValue((prev) => ({
      ...prev,
      user: { ...prev.user, username: value },
    }));

    if (value?.length >= 13) {
      setSkip(false);
    } else {
      setSkip(true);
    }
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

    // Password validation
    if (name === "user.password") {
      if (value === "") {
        setError((prevError) => ({ ...prevError, password: "" }));
      } else {
        setError((prevError) => ({
          ...prevError,
          password:
            value.length < 8 ? "Parol juda oddiy 👎" : "Parol juda zo'r 👍",
        }));
      }
    }
  };

  //O'qituvchi qo'shish
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setHasSubmitted(true);
      await createParent(inputValue);
      setInputValue(INITIAL_STATE);
      setHasSubmitted(false);
    } catch (error) {
      toast.error("Ma'lumot qo'shishda xatolik", error.message);
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
        Ota-Ona Qo'shish
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
                  value={inputValue.user.username}
                />
              </div>
              {allUserName?.exists && (
                <p className="text-red-600 absolute text-[12px] -bottom-4">
                  Ushbu foydalanuvchi nomi allaqachon mavjud
                </p>
              )}
            </div>
            <div className="col-span-1 row-span-1 relative">
              <InputField
                label="Foydalanuvchi Paroli"
                id="password"
                name="user.password"
                type={show ? "text" : "password"}
                autoComplete="password"
                handleChange={handleChange}
                icon={
                  show ? (
                    <AiOutlineEye
                      className="absolute top-10 text-xl right-2 cursor-pointer"
                      onClick={() => setShow(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute top-10 text-xl right-2 cursor-pointer"
                      onClick={() => setShow(true)}
                    />
                  )
                }
              />
              {error.password && (
                <p
                  className={`text-${
                    inputValue.user.password.length < 8 ? "red" : "green"
                  }-600 absolute text-[12px] -bottom-3`}
                >
                  {error.password}
                </p>
              )}
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="children"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Farzandlar
              </label>
              <div className="mt-1.5">
                <Select
                  placeholder="Tanlang..."
                  closeMenuOnSelect={false}
                  components={makeAnimated}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      outlineColor: state.isFocused ? "red" : "black",
                      outline: state.isFocused && "0",
                      fontSize: "14px",
                    }),
                  }}
                  isMulti
                  onChange={(e) =>
                    setInputValue({
                      ...inputValue,
                      children: e.map((item) => item.value),
                    })
                  }
                  options={
                    isLoading
                      ? []
                      : data.map((item) => {
                          return {
                            value: item.id,
                            label: item.user.first_name,
                          };
                        })
                  }
                  noOptionsMessage={() => {
                    return <div>Ma'lumotlar yo'q</div>;
                  }}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

const MemoizeAddStaff = memo(AddParent);

export default MemoizeAddStaff;
