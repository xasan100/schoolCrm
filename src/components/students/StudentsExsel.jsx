import React, { useEffect, useState } from "react";
import { AiFillFileExcel, AiOutlineUserAdd } from "react-icons/ai";
import Modal from "../../generic/Modal";
import { useCreateStudentMutation, useExselStudentMutation, usexselStudentMutation } from "../../redux/slice/students/students.js";
import { toast } from "react-toastify";
import { useGetTypeQuery } from "../../redux/slice/user/typeAdmin.js";
import Loader from "../Loader/Loader.jsx";
import { useGetPermitionQuery } from "../../redux/slice/user/permitio.js";
import CustomInput from "react-phone-number-input/input";
import { useCreateUserMutation } from "../../redux/slice/user/user.js";
import Exsel from "../../assets/icon/exsel.svg"
import FileUpload from "../FileUpload/FileUpload.jsx";
export function ExselStudent() {
    // state
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState()


    console.log(inputValue, 'inputValue');

    // get
    const { data } = useGetTypeQuery()
    const [createUser, { isLoading, isSuccess }] = useExselStudentMutation();



    const addData = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('student_table', inputValue.student_table);
        try {
            await createUser(formData);
            toast.success(`O'quvchi Exselda Qo'shildi`);
            setOpen(false);
        } catch (error) {
            toast.error("O'quvchi Exselda Qo'shishda xatolik bor", error.error);
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

                <img className="w-[40px] text-white h-5" src={Exsel} alt="exsel" />
                Exsel  O'quvchi  Qo'shish
            </button>
            {open && (
                <Modal title={<h1> Exsel  O'quvchi  Qo'shish</h1>}
                    loader={isLoading}
                    closeModal={onClose} addFunc={addData}>
                    <div className="grid grid-cols-1 grid-rows-2 justify-centerc items-center w-full text-center">
                        <FileUpload
                            className='w-7 h-9'
                            iconName={<AiFillFileExcel className="w-7" />}
                            title="Yuklash"
                            LabelFor="fileInput"
                            setInputValue={setInputValue}
                            inputValue={inputValue}
                            acceptedFormats={[".xls", ".xlsx", ".xlsm", ".xlsb"]}
                        />
                    </div>
                </Modal>
            )
            }
        </div >
    );
}

export default ExselStudent
