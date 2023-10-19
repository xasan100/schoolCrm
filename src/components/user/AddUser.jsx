import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUserAdd } from "react-icons/ai";
import Modal from "../../generic/Modal";
import { toast } from "react-toastify";
import { useGetTypeQuery } from "../../redux/slice/user/typeAdmin.js";
import Loader from "../Loader/Loader.jsx";
import { useGetPermitionQuery } from "../../redux/slice/user/permitio.js";
import CustomInput from "react-phone-number-input/input";
import { useCreateUserMutation } from "../../redux/slice/user/user.js";
import { useGetAllUserNameQuery } from "../../redux/slice/checkUsername/CheckUsername.jsx";

export function AddStudent() {
  // state
  const [open, setOpen] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);
  const [types, setTypes] = useState()
  const [showPassword, setShowPassword] = useState(false);
  const { data: allUserName } = useGetAllUserNameQuery();
  console.log(allUserName,'types');
  const [inputValue, setInputValue] = useState({
    types: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    salary: null,

  },
  );
  const TypesName = types?.match(/[A-z]/g)?.join('');
  console.log(TypesName,'TypesName');
  useEffect(() => {


    if (types === 4) setTypes('Admin')

  }, [types])
  // get
  const { data } = useGetTypeQuery()
  const [createUser, { isLoading  }] = useCreateUserMutation();
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
    formData.append('user.username', inputValue?.username);
    formData.append('user.password', inputValue?.password);
    formData.append('user.first_name', inputValue?.first_name);
    formData.append('user.last_name', inputValue?.last_name);
    formData.append('salary', inputValue?.salary);
    formData.append('types', types?.match(/\d+/g)?.join(''))
    // formData.append('.userid', inputValue?.id);
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
          <div className="grid  grid-cols-2    ">
            <div className="grid gap-5 grid-cols-3">
              <div className="grid gap-2">
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

                <div>
                  <span>Telfon Raqam</span>
                  <CustomInput
                    maxLength={17}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) =>
                      setInputValue({ ...inputValue, username: e })
                    }
                    value={inputValue.username}
                  />
                </div>
                <div className="relative">
                  <span>Password</span>
                  <input
                    id="password"
                    name="user.password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="password"
                    required
                    onChange={(e) =>
                      setInputValue({ ...inputValue, password: e.target.value })
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 bottom-3/1 flex items-center cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEye
                        className="absolute top-2/4 text-xl right-4 cursor-pointer"
                      />

                    ) : (
                      <AiOutlineEyeInvisible
                        className="absolute top-2/4 text-xl right-4 cursor-pointer"
                      />
                    )}
                  </button>
                </div>
              </div>
              <div className="grid gap-3">

                <div className="relative">
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
                      ? <p className="text-red-600 absolute text-[12px] -bottom-4">Iltimos faqad raqam ishlating !</p>
                      : ''}
                  </span>
                </div>
                <div>
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

            </div>
            <div className="grid gap-5 grid-cols-2">
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