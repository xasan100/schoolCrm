/** @format */

import React, { useState } from "react";
import Modal from "../../generic/Modal";
import { usePaymentStudentMutation } from "../../redux/slice/students/students.js";
import { toast } from "react-toastify";
import { MdPayment } from "react-icons/md";

export function StudentPay({ ID }) {

    const [open, setOpen] = useState(false); // Fixed the typo here
    const [createStudent, { isLoading }] = usePaymentStudentMutation();

    const [inputValue, setInputValue] = useState({
        payment: "",
        date: "",
    });

    const addData = async (e) => {
        const formData = new FormData();
        formData.append("amount", inputValue?.payment > 0 && inputValue?.payment);
        formData.append("student", ID);
        formData.append("type", 'EACH_PAY');


        try {
            await createStudent(formData).unwrap();
            toast.success(`O'quvchi To'lov qo'shildi`);
            setOpen(false);
            setInputValue(
                {
                    payment: "",
                    date: "",
                }
            )
        } catch (error) {
            toast.error("O'quv  chi To'lov qo'shilmadi");
        }
    };

    const res = inputValue?.payment;
    const onClose = () => {
        setOpen(false);
        setInputValue(
            {
                payment: "",
                date: "",
            }
        )
    };

    return (
        <div className='col-span-4'>
            <button
                onClick={() => setOpen(true)}
                type='button'
                className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-400"

            >
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
