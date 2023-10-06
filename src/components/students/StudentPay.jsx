/** @format */

import React, { useState } from "react";
import Modal from "../../generic/Modal";
import { usePaymentStudentMutation } from "../../redux/slice/students/students.js";
import { toast } from "react-toastify";
import { MdPayment } from "react-icons/md";

export function StudentPay({ ID }) {
    const [open, setOpen] = useState(false); // Fixed the typo here
    const [createStudent, { isLoading, isSuccess }] = usePaymentStudentMutation();

    const [inputValue, setInputValue] = useState({
        payment: "",
        date: "",
    });

    console.log(inputValue?.payment);
    const addData = async (e) => {
        const formData = new FormData();
        formData.append("paid", inputValue?.payment);
        formData.append("student", ID);
        try {
            await createStudent(formData).unwrap();
            toast.success(`O'quvchi To'lov qo'shildi`);
            setOpen(false);
        } catch (error) {
            toast.error("O'qiuvchi To'lov qo'shilmadi");
            console.error("Failed to add student:", error);
        }
    };

    const res = inputValue?.payment;
    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className='col-span-4'>
            <button
                onClick={() => setOpen(true)}
                type='button'
                className='inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                <MdPayment className='-ml-0.5 mr-1.5 text-xl' aria-hidden='true' />
                To'lov
            </button>
            {open && (
                <Modal
                    title={"To'lov"}
                    loader={isLoading}
                    closeModal={onClose}
                    addFunc={() => addData(ID)}>
                    <div className='grid grid-cols-2 gap-5'>
                        <div>
                            <span>To'lov summasi</span>
                            <input
                                type='text'
                                id='pulMiqdori'
                                name='sallery'
                                autoComplete='salary'
                                required
                                onChange={(e) =>
                                    setInputValue({ ...inputValue, payment: e.target.value })
                                }
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default StudentPay;
