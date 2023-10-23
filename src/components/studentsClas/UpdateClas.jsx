import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../generic/Modal";
import { LuEdit2 } from "react-icons/lu";
import Loader from "../Loader/Loader.jsx";
import { useGetTeachersbusyQuery } from "../../redux/slice/teachers/TeachersSlice.js";
import { useGetRoomsbusyQuery } from "../../redux/slice/rooms/RoomsCrud.js";
import { useUpdateStudentsClassMutation } from "../../redux/slice/studentsClas/studentsClas.js";

export default function UpdateStudentClas({ object }) {
  const [opne, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(object);
  const [select, setSelect] = useState(
    {
      teacher: "",
      room: "",
    }
  )
  const { data: teachersForClassData, isLoading: isLoadingTeachersForClass, refetch } = useGetTeachersbusyQuery();
  const [updateStudentsClass, { isLoading, isError, error }] = useUpdateStudentsClassMutation();
  const { data: roomData,  refetch: refetchroom } = useGetRoomsbusyQuery();



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', inputValue?.title);
    formData.append('teacher', select.teacher);
    formData.append('room', select.room);
    formData.append('id', inputValue?.id);
    try {
      await updateStudentsClass(formData);
      toast.success(` ${inputValue?.title} Sinif  O'zgartirildi`);
      setOpen(false);
    } catch (error) {
      toast.error("Foydalanuvchi o'zgartirishda xatolik xatolik", error.message);
    }
    refetchroom()
    refetch()
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
          <div className="grid gap-5 grid-cols-3">

            <div>
              <p>Sinf Nomi</p>
              <input
                id="password"
                name="user.password"
                type="text"
                autoComplete="password"
                required
                value={inputValue?.title}
                onChange={(e) =>
                  setInputValue({ ...inputValue, title: e.target.value })
                }
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <span>O'qtuvchi Tanlash</span>
              <select
                onChange={(e) => setSelect({ ...select, teacher: e.target.value })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="Hech biri">Hech biri</option>
                {isLoadingTeachersForClass ? (
                  <option>Loading...</option>
                ) : (
                  Array.isArray(teachersForClassData) ? (
                    teachersForClassData.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.user.first_name} {/* Replace 'name' with the actual property you want to display */}
                      </option>
                    ))
                  ) : (
                    <option>No data available.</option>
                  )
                )}
              </select>
            </div>
            <div>
              <span> Xona Tanlash</span>
              <select
                onChange={(e) => setSelect({ ...select, room: e.target.value })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option value="Hech biri">Hech biri</option>
                {isLoading ? <Loader /> : roomData?.map((val) => (
                  <option
                    key={val?.id} value={val?.id}> {val?.name}</option>
                ))}
              </select>
            </div>
          </div>

        </Modal>
      )}
    </div>
  );
}
