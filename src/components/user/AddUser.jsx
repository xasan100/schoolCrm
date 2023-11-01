import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUserAdd } from "react-icons/ai";
import Modal from "../../generic/Modal";
import { toast } from "react-toastify";
import { useGetTypeQuery } from "../../redux/slice/user/typeAdmin.js";
import Loader from "../Loader/Loader.jsx";
import { useGetPermitionQuery } from "../../redux/slice/user/permitio.js";
import CustomInput from "react-phone-number-input/input";
import { useCreateUserMutation } from "../../redux/slice/user/user.js";
import { debounce } from "lodash";
import ImageUpload from "../ImageUpload/ImageUpload.jsx";
import { MdOutlineInsertPhoto } from "react-icons/md";


export function AddStudent() {
  // state
  const [open, setOpen] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);
  const [number, setNumber] = useState('')
  const [error, setError] = useState({ sallery: "", username: "", password: '' });
  const [types, setTypes] = useState()
  const [showPassword, setShowPassword] = useState(false);

  const [inputValue, setInputValue] = useState({
    types: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    salary: null,
    img: '',
    middleName: '',


  },
  );
  const TypesName = types?.match(/[A-z]/g)?.join('');

  // get
  const { data } = useGetTypeQuery()
  const [createUser, { isLoading }] = useCreateUserMutation();
  const { data: permitiondata } = useGetPermitionQuery()
  const handleCheckboxChange = (id, isChecked) => {
    if (isChecked) {
      setCheckedIds(prevIds => [...prevIds, id]);
    } else {
      setCheckedIds(prevIds => prevIds.filter(prevId => prevId !== id));
    }
  };

  const addData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user.username', number);
    formData.append('user.password', inputValue?.password);
    formData.append('user.first_name', inputValue?.first_name);
    formData.append('user.last_name', inputValue?.last_name);
    formData.append('salary', inputValue?.salary);
    formData.append('types', types?.match(/\d+/g)?.join(''))
    formData.append('user.middle_name', inputValue.middleName);
    formData.append('user.image', inputValue.img);

    if (checkedIds && Array.isArray(checkedIds)) {
      checkedIds.forEach((id) => {
        formData.append('permissions', id);
      });
    } else {
      formData.append('permissions', []);
    }
    try {
      await createUser(formData);
      toast.success(`Addmin ${inputValue?.first_name} Qo'shildi`);
      setOpen(false);
    } catch (error) {
      toast.error("Admin o'zgartirishda xatolik", error.message);
    }
  };
  const onClose = () => {
    setOpen(false);
  };
  const fetchFromBackend = async () => {
    const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/api/v1/users/check_username_exists/?username=${number}`);
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
        Admin Qo'shish
      </button>
      {open && (
        <Modal title={<h1>Admin Q'shshish</h1>}
          loader={isLoading}
          closeModal={onClose} addFunc={addData}>
          <div className="grid  grid-cols-2  gap-2  ">
            <div className="grid gap-3 grid-cols-2 items-center">
              <div className="grid gap-2 items-center">
                <div>
                  <span>Tanlash</span>
                  <select
                    onChange={(e) => setTypes(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                  >
                    <option value="Hech biri">Hech biri</option>
                    {isLoading ? <Loader /> : data?.map((val) => (
                      <option
                        value={`${val?.title} ${val?.id}`}> {val?.title}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-1 row-span-1 relative">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900 w-72"
                  >
                    Telfon Raqam
                  </label>
                  <div className="mt-2" >
                    <CustomInput
                      placeholder="Telfon raqamingiz kiriting qayta takrorlanmagan"
                      maxLength={17}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setNumber(e)}
                      value={number} />

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
              </div>

              <div className="grid gap-3">
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
                      ? <p className="text-red-600 absolute text-[12px] -bottom-4">Iltimos faqad raqam ishlating !</p>
                      : ''}
                  </span>
                </div>
                <div >
                  <span>Ismingiz </span>
                  <input
                    id="password"
                    name="user.password"
                    type="text"
                    autoComplete="password"
                    required
                    onChange={(e) =>
                      setInputValue({ ...inputValue, first_name: e.target.value })
                    }
                    className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <span>Familyangiz</span>
                  <input
                    id="password"
                    name="user.password"
                    type="text"
                    autoComplete="password"
                    required
                    onChange={(e) =>
                      setInputValue({ ...inputValue, last_name: e.target.value })
                    }
                    className="block  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

              </div>

              <div className="col-span-1 row-span-1 relative">
                <p>Otasni Ismi</p>
                <input
                  id="salary"
                  name="user.salary"
                  type="text"
                  autoComplete="salary"
                  required
                  onChange={(e) =>
                    setInputValue({ ...inputValue, middleName: e.target.value })
                  }
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
            </div>
            <div className="grid gap-5 grid-cols-2 my-[40px 0px]">
              {
                TypesName === 'Admin' ? permitiondata?.map((val) => {
                  return (
                    <div className="flex items-center mb-4" key={val.id}>
                      <input
                        id={val.title}
                        type="checkbox"
                        value={val.id}
                        checked={checkedIds.includes(val.id)}
                        onChange={e => handleCheckboxChange(val.id, e.target.checked)}
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for={val.title} class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {val.title}
                      </label>
                    </div>
                  )
                }) : ''
              }
            </div>
          </div>
        </Modal>
      )
      }
    </div >
  );
}

export default AddStudent