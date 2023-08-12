import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AdminAddPost } from '../../../redux/slice/admins/adminaddType/index.js';
import { adminTypeGetAxsios } from '../../../redux/slice/admins/adminTypeGet/index.js';
import CustomInput from 'react-phone-number-input/input'
import { permissionGetAdmin } from '../../../redux/slice/admins/permission/permissionGet/index.jsx';

export const LoginAdminAdd = () => {
    const dispatch = useDispatch()
    // state
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState({
        username: '',
        FirstName: '',
        password: '',
        LastName: '',
        selectChange: '',
        permissionId: '',

    });

    // useSelector
    const adminTypeGet = useSelector((store) => store.adminTypeGet)
    const { data, status } = useSelector((store) => store.permissionGet)


    // useEffect
    useEffect(() => {
        if (isOpen === true) dispatch(adminTypeGetAxsios())
    }, [isOpen])


    // funcksiya
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const Funk = (e) => {
        const selectedValue = e.target.value;
        setInputValue({ ...inputValue, selectChange: selectedValue });
        if (selectedValue === 'Admin') {
            dispatch(permissionGetAdmin());
        }
    }
    const PermitaionPush = (e, id) => {
        if (e.target.checked === true) {
            setInputValue({ ...inputValue, permissionId: id })
        }
    }
    console.log(isOpen, 'isOpen');

    const addFuck = () => {
        dispatch(AdminAddPost(inputValue));
    }

    return (
        <div className='flex items-center justify-center w-[100] h-[100vh] bg-white g-[10px]'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[80%] ">
                <div className="flex items-center justify-between py-4 bg-white dark:bg-gray-800 ">
                    <label for="table-search" className="sr-only">Qidirish</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                    </div>

                    <div className="flex flex-col items-center justify-center ">
                        <button
                            onClick={openModal}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Admin Q'shish
                        </button>

                        {isOpen && (
                            <div className=" grid-cols-2 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                                <div className="grid grid-cols-2 bg-white ml-40  h-[50vh] rounded shadow-lg   gap-4 w-3/5 ">
                                    <div className='flex flex-col justify-around p-4'>
                                        <CustomInput
                                            placeholder='Telfon raqamingiz kiriting sizga bu login sifatida beriladi'
                                            maxLength={17}
                                            className={'customPhoneInput'}
                                            onChange={(e) => setInputValue({ ...inputValue, username: e })}
                                            value={inputValue.username}
                                        />

                                        <input
                                            type="text"
                                            className="border rounded w-full p-2 mb-2"
                                            placeholder="Password"
                                            onChange={(e) => setInputValue({ ...inputValue, password: e.target.value })}

                                        />
                                        <input
                                            type="text"
                                            className="border rounded w-full p-2 mb-2"
                                            placeholder="Isim"
                                            onChange={(e) => setInputValue({ ...inputValue, FirstName: e.target.value })}

                                        />
                                        <input
                                            type="text"
                                            className="border rounded w-full p-2 mb-2"
                                            placeholder="Familya"
                                            onChange={(e) => setInputValue({ ...inputValue, LastName: e.target.value })}
                                        />



                                        <button
                                            onClick={closeModal}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
                                        >
                                            Orqaga
                                        </button>
                                    </div>

                                    <div className='flex flex-col  justify-between pb-7 px-2 '>
                                        <div className='flex justify-between items-center'>
                                            <h2 className="text-xl font-bold mb-2"></h2>
                                            <h1 onClick={closeModal} className=' bg-gray-50 border p-1 cursor-pointer'>✖︎</h1>
                                        </div>

                                        <div>
                                            <label for="countries" class="block  mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                            <select onChange={(e) => Funk(e)} id="countries" class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                {adminTypeGet?.data?.map((val, index) => <option key={index}>{val?.title}</option>)}
                                            </select>
                                        </div>

                                        {inputValue.selectChange === 'Admin' && isOpen == true ? data?.map((val) => {
                                            return (
                                                <div className='flex justify-between'>
                                                    <h1>{val?.title}</h1>
                                                    <label class="relative inline-flex items-center cursor-pointer">
                                                        <input onChange={(e) => PermitaionPush(e, val.id)} type="checkbox" value="" class="sr-only peer" />
                                                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                    </label>

                                                </div>
                                            )
                                        }) : ''}

                                        <button onClick={addFuck} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Yuborish
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Position
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                                <div className="pl-3">
                                    <div className="text-base font-semibold">Neil Sims</div>
                                    <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                React Developer
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Online
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                                <div className="pl-3">
                                    <div className="text-base font-semibold">Neil Sims</div>
                                    <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                React Developer
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Online
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                                <div className="pl-3">
                                    <div className="text-base font-semibold">Neil Sims</div>
                                    <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                React Developer
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Online
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                                <div className="pl-3">
                                    <div className="text-base font-semibold">Neil Sims</div>
                                    <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                React Developer
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Online
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}
export default LoginAdminAdd

