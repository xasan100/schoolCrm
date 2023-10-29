import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUserAdd } from "react-icons/ai";
import Modal from "../../generic/Modal";
import { toast } from "react-toastify";
import CustomInput from "react-phone-number-input/input";
import { useEffect } from "react";
import InputField from "../../generic/InputField";
import { memo } from "react";
import { useCreateStaffMutation } from "../../redux/slice/staff/StaffSlice.js";
import { debounce } from "lodash";
import { MdOutlineInsertPhoto } from "react-icons/md";
import ImageUpload from "../ImageUpload/ImageUpload.jsx";




function AddStaff() {
  const [number, setNumber] = useState('')
  const [opne, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState({
    username: "",
    firstName: "",
    password: "",
    lastName: "",
    middleName: "",
    position: "",
    salary: "",
    image: '',
  });

  const [createParent, { isLoading }] = useCreateStaffMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ sallery: "", username: "", password: '' });




  const onClose = () => {
    setOpen(false);
    setError({ sallery: "", username: "", password: '' });
    setNumber('')
  };


  const addData = async () => {
    const formData = new FormData();
    formData.append('user.username', number);
    formData.append('user.password', inputValue.password);
    formData.append('user.user.first_name', inputValue.firstName);
    formData.append('user.last_name', inputValue.lastName);
    formData.append('user.middle_name', inputValue.middleName);
    formData.append('position', inputValue.position);
    formData.append('salary', inputValue.salary);
    formData.append('user.image', inputValue.img);

    try {
      await createParent(formData).unwrap();
      toast.success(`O'quvchi ${inputValue.firstName} qo'shildi`);
      setInputValue({
        username: "",
        firstName: "",
        password: "",
        lastName: "",
        middleName: "",
        position: "",
        salary: ""
      })
      setNumber('')
      setOpen(false);
    } catch (error) {
      toast.error(`O'quvchi ${inputValue.firstName} qo'shilmadi`);
    }
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, password: value });
    if (name === "password") { // Check if the field name is "user.password"
      if (value === "") {
        setError((error) => ({ ...error, password: "" }));
      } else {
        setError((error) => ({
          ...error,
          password:
            value.length < 8 ? "Parol juda oddiy 👎" : "Parol juda zo'r 👍",
        }));
      }
    }
  };
  const fetchFromBackend = async () => {
    const response = await fetch(`https://alcrm.pythonanywhere.com/api/v1/users/check_username_exists/?username=${number}`);
    
    const data = await response.json();
    if (data.exists) {
      setError({ ...error, username: 'Ushbu username allaqachon mavjud!' })
    }
    else {
      setError({ ...error, username: '' })
    }
  };
  const debouncedFetch = debounce(fetchFromBackend, 100); // 300ms delay
  useEffect(() => {
    if (number?.length >= 13) {
      debouncedFetch();
    }
  }, [number]);

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
          addFunc={addData}
          loader={isLoading}
        // isDisabled={isDisabled}
        >
          <div className="grid sm:grid-rows-6 grid-cols-2 sx:grid-cols-1 gap-2 relative">
            <InputField
              label="Ism"
              id="first-name"
              name="user.first_name"
              type="text"
              autoComplete="first_name"
              handleChange={(e) => setInputValue({ ...inputValue, firstName: e.target.value })}

            />
            <InputField
              label="Familiya"
              id="last-name"
              name="user.last_name"
              type="text"
              autoComplete="last-name"
              handleChange={(e) => setInputValue({ ...inputValue, lastName: e.target.value })}
            />
            <InputField
              label="Otasinig ismi"
              id="middle-name"
              name="user.middle_name"
              type="text"
              autoComplete="middle-name"
              handleChange={(e) => setInputValue({ ...inputValue, middleName: e.target.value })}
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
                  onChange={(e) => setNumber(e)}
                  value={number}
                />
              </div>
              {error.username && (
                <p className="text-red-600  absolute text-[12px] -bottom-3  text-xs">
                  {error.username.length >= 13 ? error.username : ''}
                </p>
              )}
            </div>
            <div className="col-span-1 row-span-1 relative" >
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Parol Yarating
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  onChange={handlePasswordChange}
                  value={inputValue.password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEye
                      className="absolute top-2 text-xl right-2 cursor-pointer"
                    />

                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute top-2 text-xl right-2 cursor-pointer"
                    />
                  )}
                </p>
              </div>
              {error?.password && (
                <p
                  className={`text-${inputValue?.password.length < 8 ? "red" : "green"
                    } absolute bottom-2/1 text-xs`}
                >
                  {error.password}
                </p>
              )}
            </div>
            <div className="col-span-1 row-span-1 relative">
              <p>Oylik Maosh</p>

              <input
                id="salary"
                name="user.salary"
                type="text"
                autoComplete="salary"
                required
                pattern="[0-9]*"
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
            <ImageUpload
              title={"IMG"}
              iconName={<MdOutlineInsertPhoto className="text-5xl" />}
              iconTitle={"Rasmni Yuklash"}
              fileType={"PNG, JPG, JPEG 5mb gacha"}
              LabelFor={"img"}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
            <InputField
              label="Lavozimi"
              id="position"
              name="position"
              type="text"
              value={inputValue?.position}
              autoComplete="position"
              handleChange={(e) => setInputValue({ ...inputValue, position: e.target.value })}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

const MemoizeAddStaff = memo(AddStaff);

export default MemoizeAddStaff;
