import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AdminAddPost } from '../../../redux/slice/admins/adminaTypePost/index.js';
import { adminTypeGetAxsios } from '../../../redux/slice/admins/adminTypeSelectGet/index.js';
import CustomInput from 'react-phone-number-input/input'
import { permissionGetAdmin } from '../../../redux/slice/admins/permission/permissionGet/index.jsx';
import { AiOutlineEye, AiOutlineUserAdd } from "react-icons/ai";
import { LuEdit2 } from "react-icons/lu";
import { BsTrash } from "react-icons/bs";
// import { adminCustomGetAxios } from '../../../redux/slice/admins/adminTypeCustom/index.js';
import Modal from '../../../generic/Modal.jsx';
import { AdminDeletId } from '../../../redux/slice/admins/adminaDelete/index.js';



export const LoginAdminAdd = () => {
    const dispatch = useDispatch()
    // state

    const [isOpen, setIsOpen] = useState(
        {
            open: false,
            delte: false
        }
    );
    const [adminData, SetadminData] = useState([])
    const [inputValue, setInputValue] = useState({
        username: '',
        FirstName: '',
        password: '',
        LastName: '',
        selectChange: '',
        permissionId: '',
        typeAddmens: '',
        adminId: '',
        deleteId: '',
        data: '',

    });

    // useSelector
    // const adminTypeGet = useSelector((store) => store.adminTypeGet)
    // const adminCustomGet = useSelector((store) => store.adminCustomGet)

    // const { data, status } = useSelector((store) => store.permissionGet)

    // useEffect
    // useEffect(() => {
    //     if (isOpen.open === true) dispatch(adminTypeGetAxsios())
    //     if (adminCustomGet.data) {
    //         SetadminData(adminCustomGet.data)
    //     }
    // }, [isOpen.open])

    // useEffect(() => {
    //     dispatch(adminCustomGetAxios())
    // }, [])

    // funcksiya
    const openModal = () => setIsOpen({ ...isOpen, open: true });
    const closeModal = () => setIsOpen({ ...isOpen, open: false });
    const deletOff = () => setIsOpen({ ...isOpen, delte: false });
    const deletOn = (id) => {
        setIsOpen({ ...isOpen, delte: true })
        setInputValue({ ...inputValue, deleteId: id })
    };


    const Funk = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue) {
            const result = selectedValue.toLocaleUpperCase().match(/[A-z]/g).join('');
            const permission = selectedValue.toLocaleUpperCase().match(/[0-9]/g).join('');

            setInputValue(prevState => ({
                ...prevState,
                selectChange: selectedValue,
                typeAddmens: result,
                adminId: permission,
            }));
            if (result === 'ADMIN') dispatch(permissionGetAdmin());
        }
    }
    const PermitaionPush = (e, id) => {
        if (e.target.checked === true) {
            setInputValue({ ...inputValue, permissionId: id })
        }
    }

    const addFuck = () => {
        dispatch(AdminAddPost(inputValue));
    }
    const pushId = () => dispatch(AdminDeletId(inputValue.deleteId))



    return (
        <div className='flex items-center justify-center w-[100] h-[90vh] bg-white g-[10px]'>
            <div className="relative  overflow-x-auto shadow-md sm:rounded-lg w-[90%] ">
                <div className="flex items-center justify-between py-4 bg-white dark:bg-gray-800 ">
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
                        <button
                            onClick={openModal}
                            className="bg-blue-500 flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            <AiOutlineUserAdd
                                className="-ml-0.5 mr-1.5 text-xl"
                                aria-hidden="true"
                            />
                            Admin Q'shish
                        </button>

                        {isOpen.open && (
                            <div className=" grid-cols-2 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                                <div className="grid grid-cols-2 bg-white ml-40  h-[80vh] rounded shadow-lg   gap-4 w-3/5 ">
                                    <div className='flex flex-col  justify-between  pb-7 pt-12 p-3 '>
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
                                        <div></div>
                                        <div></div>
                                        <div></div>
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
                                            <select onChange={(e) => Funk(e)} id="countries" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                {/* {.data?.map((val, index) => <option key={index}> {val?.title} {val.id}</option>)} */}
                                            </select>
                                        </div>

                                        {/* {inputValue.typeAddmens === 'ADMIN' ? data?.map((val, index) => {
                                            return (
                                                <div key={index} className='flex justify-between'>
                                                    <h1>{val?.title}</h1>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input onChange={(e) => PermitaionPush(e, val.id)} type="checkbox" value="" className="sr-only peer" />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                    </label>

                                                </div>
                                            )
                                        }) : ''} */}

                                        <button onClick={addFuck} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Yuborish
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* <ul className="divide-y overflow-y-auto h-[77vh] divide-gray-100 col-span-12 border rounded-lg overflow-hidden">
                    {adminData?.map((person, index) => (
                        <li
                            key={person?.email}
                            className="flex justify-between gap-x-6 px-2 py-3 cursor-pointer hover:bg-gray-200"
                        >
                            <div className="flex min-w-0 gap-x-4">
                                <h1 >{index + 1}.</h1>

                                <img
                                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                    src={person?.imageUrl}
                                    alt=""
                                />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {person?.first_name}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                        {person?.last_name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    <AiOutlineEye
                                        className="-ml-0.5 mr-1.5 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    Ko'rish
                                </button>
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
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </Modal>
                                )}

                            </div>
                        </li>
                    ))}
                </ul> */}
            </div>
        </div>

    )
}
export default LoginAdminAdd

