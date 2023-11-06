import React, { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineFileAdd,
  AiOutlineUserAdd,
} from "react-icons/ai";
import Modal from "../../generic/Modal";
import ImageUpload from "../ImageUpload/ImageUpload";
import { MdOutlineInsertPhoto } from "react-icons/md";
import FileUpload from "../FileUpload/FileUpload";
import {
  useCreateTeacherMutation,
} from "../../redux/slice/teachers/TeachersSlice";
import { useGetSciencesQuery } from "../../redux/slice/sciences/SciencesSlice";
import { toast } from "react-toastify";
import CustomInput from "react-phone-number-input/input";
import { useEffect } from "react";
import InputField from "../../generic/InputField";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useGetAllUserNameQuery } from "../../redux/slice/checkUsername/CheckUsername";
const INITIAL_STATE = {
  user: {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    image: "",
  },
  id_card: "",
  date_of_employment: "",
  gender: "MALE",
  address: "",
  experience: "HIGH_CATEGORY",
  language_certificate: "TESOL",
  language_certificate_file: "",
  sciences: [0],
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
  const [createTeacher, { isLoading, isSuccess }] = useCreateTeacherMutation();
  const [skip, setSkip] = useState(true);
  const { data } = useGetAllUserNameQuery(inputValue.user.username, { skip });
  const { data: science } = useGetSciencesQuery();
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (hasSubmitted) {
      if (isSuccess) {
        toast.success("O'qituvchi qo'shildi");
        setOpen(false);
      } else if (!isLoading && !isSuccess) {
        toast.error("O'qituvchi qo'shilmadi");
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
      // language_certificate va experience maydonlarini tashlab yuborish
      if (
        key === "language_certificate" ||
        key === "experience" ||
        key === "language_certificate_file"
      ) {
        continue;
      }

      const value = input[key];

      if (typeof value === "object" && value !== null) {
        if (Array.isArray(value) && value.length === 0) {
          return true;
        }
        if (value instanceof File) {
          continue;
        }
        if (isAnyFieldEmpty(value)) {
          return true;
        }
      } else if (value === "" || value === null || value === undefined) {
        return true;
      }
    }
    return false;
  };

  const isDisabled = isAnyFieldEmpty(inputValue);

  //Faqatgina username inputidan qiymat olish chunki u boshqacha component
  // const handleUsernameChange = (e) => {
  //   const value = e;
  //   const isUsernameExists = data.some(
  //     (teacher) => teacher.user.username === value
  //   );

  //   setInputValue((prev) => ({
  //     ...prev,
  //     user: { ...prev.user, username: value },
  //   }));

  //   setError((prevError) => ({
  //     ...prevError,
  //     username: isUsernameExists ? "Ushbu username allaqachon mavjud!" : "",
  //   }));
  // };
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    const newValue =
      keys?.length > 1
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
    const formData = new FormData();

    for (let key in inputValue) {
      if (key === "user") {
        for (let userKey in inputValue[key]) {
          formData.append(`user.${userKey}`, inputValue[key][userKey]);
        }
      } else if (
        key === "sciences" &&
        inputValue[key] &&
        Array.isArray(inputValue[key])
      ) {
        inputValue[key].forEach((value) => {
          formData.append(key, value);
        });
      } else {
        formData.append(key, inputValue[key]);
      }
    }

    try {
      setHasSubmitted(true);
      await createTeacher(formData);
      setInputValue(INITIAL_STATE);
      setHasSubmitted(false);
    } catch (error) {
      toast.error("O'qituvchi qo'shishda xatolik", error.message);
    }
  };
  const [show, setShow] = useState(false);
  const onClose = () => {
    setOpen(false);
    setError({
      salary: "",
      username: "",
      password: "",
    });
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
        O'qituvchi Qo'shish
      </button>
      {opne && (
        <Modal
          closeModal={onClose}
          addFunc={handleSubmit}
          loader={isLoading}
          isDisabled={isDisabled}
        >
          <div className="grid grid-rows-8 md:grid-cols-4 sm:grid-cols-2 sx:grid-cols-1 gap-2">
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
              label="Otasining Ismi"
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
              {data?.exists && (
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
              LabelFor={"language_certificate_file"}
              setInputValue={setInputValue}
              inputValue={inputValue}
              acceptedFormats={[
                ".png",
                ".jpeg",
                ".jpg",
                ".doc",
                ".pdf",
                ".docx",
              ]}
            />
            <FileUpload
              title={"Tarjimai Hol"}
              iconName={<AiOutlineFileAdd className="text-2xl" />}
              LabelFor={"biography"}
              setInputValue={setInputValue}
              inputValue={inputValue}
              acceptedFormats={[
                ".png",
                ".jpeg",
                ".jpg",
                ".doc",
                ".pdf",
                ".docx",
              ]}
            />
            <FileUpload
              title={"Obyektivka"}
              iconName={<AiOutlineFileAdd className="text-2xl" />}
              LabelFor={"lens"}
              setInputValue={setInputValue}
              inputValue={inputValue}
              acceptedFormats={[
                ".png",
                ".jpeg",
                ".jpg",
                ".doc",
                ".pdf",
                ".docx",
              ]}
            />
            <FileUpload
              title={"So'rovnoma"}
              iconName={<AiOutlineFileAdd className="text-2xl" />}
              LabelFor={"survey"}
              setInputValue={setInputValue}
              inputValue={inputValue}
              acceptedFormats={[
                ".png",
                ".jpeg",
                ".jpg",
                ".doc",
                ".pdf",
                ".docx",
              ]}
            />
            <FileUpload
              title={"086 Tibbiy Malumotnoma"}
              iconName={<AiOutlineFileAdd className="text-2xl" />}
              LabelFor={"medical_book"}
              setInputValue={setInputValue}
              inputValue={inputValue}
              acceptedFormats={[
                ".png",
                ".jpeg",
                ".jpg",
                ".doc",
                ".pdf",
                ".docx",
              ]}
            />
            <FileUpload
              title={"Shaxsiy Rasmingiz"}
              iconName={<AiOutlineFileAdd className="text-2xl" />}
              LabelFor={"user.image"}
              setInputValue={setInputValue}
              inputValue={inputValue}
              acceptedFormats={[".png", ".jpeg", ".jpg"]}
            />
            <InputField
              label="Manzil"
              id="address"
              name="address"
              type="text"
              autoComplete="address"
              handleChange={handleChange}
            />
            <InputField
              label="Passport yoki ID karta raqami"
              id="id_card"
              name="id_card"
              type="text"
              autoComplete="id_card"
              handleChange={handleChange}
            />
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="sciences"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Fan
              </label>
              <div className="mt-2">
                <Select
                  closeMenuOnSelect={false}
                  components={makeAnimated}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      outlineColor: state.isFocused ? "red" : "black",
                      outline: state.isFocused && "0",
                    }),
                  }}
                  isMulti
                  onChange={(e) =>
                    setInputValue({
                      ...inputValue,
                      sciences: e.map((item) => item.value),
                    })
                  }
                  options={
                    isLoading
                      ? []
                      : science.map((item) => {
                          return { value: item.id, label: item.title };
                        })
                  }
                  noOptionsMessage={() => {
                    return <div>Ma'lumotlar yo'q</div>;
                  }}
                />
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
            <div className="col-span-2 row-span-1">
              <label
                htmlFor="language_certificate"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Sertifikat turi
              </label>
              <div className="mt-2">
                <select
                  id="language_certificate"
                  name="language_certificate"
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Hech biri</option>
                  <option value="TESOL">Tesol</option>
                  <option value="CELTA">Celta</option>
                  <option value="IELTS6">IELTS 6+</option>
                  <option value="CEFRB2">CEFR B2+</option>
                </select>
              </div>
            </div>
            <div className="col-span-2 row-span-1">
              <label
                htmlFor="experience"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Tajriba maqomi
              </label>
              <div className="mt-2">
                <select
                  id="experience"
                  name="experience"
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="HIGH_CATEGORY">Oliy toifa</option>
                  <option value="FIRST_CATEGORY">1-toifa</option>
                  <option value="SECOND_CATEGORY">2-toifa</option>
                </select>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
