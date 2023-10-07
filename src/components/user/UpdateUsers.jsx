import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../generic/Modal";
import { LuEdit2 } from "react-icons/lu";
import CustomInput from "react-phone-number-input/input";
import { useUpdateUserMutation } from "../../redux/slice/user/user.js";
import Loader from "../Loader/Loader.jsx";
import { useGetTypeQuery } from "../../redux/slice/user/typeAdmin.js";
import { useGetPermitionQuery } from "../../redux/slice/user/permitio.js";
import { useEffect } from "react";

export default function UpdateStudent({ object }) {
  const [opne, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(object);
  const [checkedIds, setCheckedIds] = useState([]);
  const [updateTeacher, { isLoading, isSuccess }] = useUpdateUserMutation();
  const { data } = useGetTypeQuery()
  const { data: permitiondata } = useGetPermitionQuery()
  const [types, setTypes] = useState()

  const updateUser = () => {
    setInputValue({
      ...inputValue,
      user: {
        ...inputValue.user,
        username: "newUsername"
      }
    });
  }



  useEffect(() => {
    if (types == 4) setTypes('Admin')

  }, [types])
  const handleCheckboxChange = (id, isChecked) => {
    if (isChecked) {
      setCheckedIds(prevIds => [...prevIds, id]);
    } else {
      setCheckedIds(prevIds => prevIds.filter(prevId => prevId !== id));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('types', inputValue?.types);
    formData.append('user.username', inputValue?.user.username);
    formData.append('user.password', inputValue?.password);
    formData.append('user.first_name', inputValue?.user.first_name);
    formData.append('user.last_name', inputValue?.user.last_name);
    formData.append('salary', inputValue?.salary);
    formData.append('id', inputValue?.id);
    if (checkedIds && Array.isArray(checkedIds)) {
      checkedIds.forEach((id) => {
        formData.append('permissions', id);
      });
    } else {
      formData.append('permissions', []);
    }
    try {
      await updateTeacher(formData);
      toast.success(`Foydalanuvchi ${inputValue?.user.first_name} O'zgartirildi`);
      setOpen(false);
    } catch (error) {
      toast.error("Foydalanuvchi o'zgartirishda xatolik xatolik", error.message);
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
                        value={val.id}> {val.title}</option>


                    ))}
                  </select>
                </div>

                <div>
                  <span>Telfon Raqam</span>
                  <CustomInput
                    maxLength={17}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    // onChange={(e) =>
                    //   setInputValue({ ...inputValue, username: e })
                    // }
                    value={inputValue?.user.username}
                    onChange={(e) =>
                      setInputValue(prevState => ({
                        ...prevState,
                        user: {
                          ...prevState.user,
                          username: e
                        }
                      }))
                    }
                  />
                </div>
                <div>
                  <span>Password</span>
                  <input
                    id="password"
                    name="user.password"
                    type="text"
                    autoComplete="password"
                    required
                    value={inputValue?.user.password}
                    onChange={(e) =>
                      setInputValue({ ...inputValue, password: e.target.value })
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="grid gap-3">

                <div>
                  <p>Oylik Maosh</p>
                  <input
                    id="password"
                    name="user.password"
                    type="text"
                    autoComplete="password"
                    required
                    value={inputValue?.salary}
                    onChange={(e) =>
                      setInputValue({ ...inputValue, salary: e.target.value })
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <span>Ismingiz </span>
                  <input
                    id="password"
                    name="user.password"
                    type="text"  // changed type to password
                    autoComplete="password"
                    required
                    value={inputValue?.user.first_name}
                    onChange={(e) =>
                      setInputValue(prevState => ({
                        ...prevState,
                        user: {
                          ...prevState.user,
                          first_name: e.target.value
                        }
                      }))
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
                    value={inputValue?.user.last_name}
                    onChange={(e) =>
                      setInputValue(prevState => ({
                        ...prevState,
                        user: {
                          ...prevState.user,
                          last_name: e.target.value
                        }
                      }))
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

            </div>
            <div className="grid gap-5 grid-cols-2">
              {
                types == 'Admin' ? permitiondata?.map((val) => {
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
      )}
    </div>
  );
}
