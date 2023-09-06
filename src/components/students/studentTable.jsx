
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineUserAdd } from "react-icons/ai";
import { LuEdit2 } from "react-icons/lu";
import { BsTrash } from "react-icons/bs";
import Modal from '../../generic/Modal.jsx';
import { reset, StudentsGet } from '../../redux/slice/students/studentsGet/index.jsx';
import { StudentDeletId } from '../../redux/slice/students/studentsDel/index.js';
import AddStudent from './AddStudent.jsx';

import {
  useGetStudentsQuery,
  useUpdateStudentsMutation,
  useDeleteStudentsMutation,
} from "../../redux/slice/students/students.js";
import { toast } from "react-toastify";
import Loader from '../Loader/Loader.jsx';

export const StudentTable = () => {
  const dispatch = useDispatch()
  // state
  const [isOpen, setIsOpen] = useState(
    {
      delte: false,
      id: null,
    });

  const [mod, setMod] = useState(false)

  const [adminData, SetadminData] = useState([])
  const [inputValue, setInputValue] = useState({
    deleteId: '',
  });

  const { data, isLoading } = useGetStudentsQuery();



  const Prive = (id) => {
    setMod(true)
  }

  const PriveClose = () => setMod(false)


  const deletOff = () => setIsOpen({ ...isOpen, delte: false });
  const deletOn = (id) => {
    setIsOpen({ ...isOpen, delte: true })
    setInputValue({ ...inputValue, deleteId: id })
  };

  const pushId = () => {
    dispatch(StudentDeletId(inputValue.deleteId))
  }



  return (
    <div className='flex items-center justify-center col-span-12 h-[90vh]    g-[10px]'>
      <div className="relative  overflow-x-auto shadow-md sl:rounded-lg w-[100%]  p-[15px]" >
        <div className="flex items-center justify-between  bg-white dark:bg-gray-800 ">
          <label htmlFor="table-search" className="sr-only">Qidirish</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input onChange={(e) => setInputValue({ ...inputValue, data: e.target.value })} type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
          </div>
          <div className="flex flex-col items-center justify-center ">
            <AddStudent />
          </div>

        </div>
        <br />
        <ul className="divide-y overflow-y-auto h-[78vh]  divide-gray-100 col-span-12 border rounded-lg overflow-hidden">
          {isLoading ? <Loader
            extraClass="col-span-12 flex justify-center  "
            Color="#62B238"
          /> : data?.map((person, index) => (
            <li
              key={person?.first_name}
              className="flex justify-between gap-x-6 px-2 py-3 cursor-pointer hover:bg-gray-200"
            >
              <div className="flex min-w-0 gap-x-4">
                <h1 >{index + 1}.</h1>

                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={person?.image}
                  alt="img"
                />
                <div className="min-w-0   flex justify-center flex-col items-center ">
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {person?.last_name}

                  </p>
                  <p>
                    {person.first_name}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <button onClick={(id) => Prive(person.id)}
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <AiOutlineEye
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                  />
                  Ko'rish
                </button>
                {mod && (

                  <div className='bg-white'>
                    <Modal className="w-full bg-slate-50" closeModal={PriveClose} >
                      <h1>dnsms</h1>

                    </Modal>
                  </div>
                )

                }
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-400"
                >
                  <LuEdit2 className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                  Taxrirlash
                </button>
                <button onClick={() => deletOn(person.id)}
                  type="button"
                  className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <BsTrash className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                  O'chirish
                </button>
                {isOpen.delte && (
                  <Modal addFunc={(id) => pushId(person)} closeModal={deletOff}>
                    <h1>Malumotingiz uchirishga Rozimisiz !!!</h1>
                    <div></div>
                  </Modal>
                )}

              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>


  );
};
export default StudentTable;
