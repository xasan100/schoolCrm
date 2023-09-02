import React, { useState, useMemo } from "react";
import AddTeacher from "./AddTeacher";
import EmptyBox from "../EmptyBox/EmptyBox";
import Loader from "../Loader/Loader";
import { LuEdit2 } from "react-icons/lu";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import {
  useDeleteTeacherMutation,
  useGetTeachersQuery,
} from "../../redux/slice/teachers/TeachersSlice";

import { toast } from "react-toastify";
import { useGetAttendanceQuery } from "../../redux/slice/attandance/Attendance.js";

const TeacherItem = ({ teacher, index, deleteTeacher }) => {
  // JSX for each teacher
  return (
    <li className="flex justify-between gap-x-6 px-2 py-3 cursor-pointer hover:bg-gray-200">
      <div className="flex min-w-0 gap-x-4">
        <h1>{index + 1}.</h1>

        <img
          className="h-12 w-12 flex-none rounded-full border"
          src={teacher?.image}
          alt="teacher_image"
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {teacher?.first_name}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {teacher?.last_name}
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <AiOutlineEye className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Ko'rish
        </button>
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-400"
        >
          <LuEdit2 className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Taxrirlash
        </button>
        <button
          onClick={() => deleteTeacher(teacher.id)}
          type="button"
          className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <BsTrash className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          O'chirish
        </button>
      </div>
    </li>
  );
};

function TeachersTableComponent() {
  // const TeachersData = useSelector((state) => state.teacherSlice);
  // const status = useSelector((state) => state.teacherSlice.status);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetTeachersQuery();
  const [deleteTeacher, { isSuccess }] = useDeleteTeacherMutation();
  const filteredTeachers = useMemo(() => {
    // Computing the filtered teachers list
    if (searchTerm) {
      return data.filter(
        (teacher) =>
          teacher.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.middle_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return data;
    }
  }, [data, searchTerm]);

  const handleDelete = async (teacherId) => {
    try {
      await deleteTeacher({ id: teacherId });
      toast.success("Teacher deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete teacher:", err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };



  return (
    <div className="h-ful gap-3 col-span-12">
      <div className="rounded-lg shadow-md col-span-12 grid grid-cols-12 border h-[75vh] items-start">
        <div className="col-span-12 flex items-center justify-between p-3">
          <div>
            <label htmlFor="table-search" className="sr-only">
              Qidirish
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Izlash..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <AddTeacher />
        </div>
        {isLoading ? (
          <Loader
            extraClass="col-span-12 flex justify-center"
            Color="#62B238"
          />
        ) : filteredTeachers.length > 0 ? (
          <ul className="divide-y-reverse overflow-y-auto h-[68vh] divide-gray-100 border rounded-lg overflow-hidden col-span-12">
            {filteredTeachers.map((teacher, index) => (
              <TeacherItem
                teacher={teacher}
                index={index}
                key={teacher.id}
                deleteTeacher={handleDelete}
              />
            ))}
          </ul>
        ) : (
          <EmptyBox />
        )}
      </div>
    </div>
  );
}

export default React.memo(TeachersTableComponent);
