import React, { useCallback, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import Modal from "../../generic/Modal";
import { useDispatch } from "react-redux";
import { useGetTeachersQuery } from "../../redux/slice/teachers/TeachersSlice.js";
import { useMemo } from "react";
import { useGetStudentsQuery } from "../../redux/slice/students/students.js";


export default function Addattandance() {
    const { data: studentsData, isLoading: studentsLoading } = useGetStudentsQuery();
    const { data: teachersData, isLoading: teachersLoading } = useGetTeachersQuery();

    const [opne, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState('');
    const [inputValue, setInputValue] = useState({
        user: '',
        name: '',
        isOpen: true
    });
    const TypeCheck = useMemo(() => {
        return (name) => {
            setInputValue(prevValue => ({ ...prevValue, name: name }));
        };
    }, [setInputValue]);


    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
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
                    aria-hidden="true" />
                Qo'shish
            </button>
            {opne && (
                <Modal closeModal={() => setOpen(false)} title={`Davomat Qo'shish`}>
                    <div className="w-full grid grid-cols-[300px_minmax(400px,_1fr)] gap-4">
                        <div className="mt-4 w-full ">
                            <select
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setInputValue({ ...inputValue, user: e.target.value })} >
                                <option value="">Foydalanuvchi Turi</option>
                                <option value="Admin">Admin</option>
                                <option value="'Oquvchi">'Oquvchi</option>
                                <option value="Xodim">Xodim</option>
                                <option value="'Oqtuvchi">'Oqtuvchi</option>
                            </select>
                            <br />
                            <div>
                                <p className="mb-1"> {inputValue.user}lar</p>

                                <div>
                                    <select
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"         >
                                        {inputValue.user === "'Oquvchi" && studentsData?.map((val, ind) => (
                                            <option key={ind + 1} className="m-2">
                                                {val.first_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 w-full">
                            <div class="flex  justify-evenly">
                                <div class="flex items-center mr-4">
                                    <input
                                        onChange={handleOptionChange}
                                        value="Kelgan"
                                        checked={selectedOption === 'Kelgan'}
                                        id="green-radio" type="radio" name="colored-radio" class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="green-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kelgan</label>
                                </div>
                                <div class="flex items-center mr-4">
                                    <input
                                        onChange={handleOptionChange}
                                        value="Kelmagan"
                                        checked={selectedOption === 'Kelmagan'}
                                        id="red-radio" type="radio" name="colored-radio" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="red-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kelmagan</label>
                                </div>
                                <div class="flex items-center mr-4">
                                    <input
                                        onChange={handleOptionChange}
                                        value="Sababli"
                                        checked={selectedOption === 'Sababli'}
                                        id="yellow-radio" type="radio" name="colored-radio" class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="yellow-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sababli</label>
                                </div>
                            </div>
                            {
                                selectedOption === 'Sababli' &&
                                <div class="relative mb-3 pl-5" data-te-input-wrapper-init>
                                    <br />
                                    <textarea id="message" rows="3" class="block p-2.5 w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                                </div>

                            }
                        </div>
                    </div>
                </Modal>
            )
            }
        </div >
    );
}