import React, { useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload.jsx";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { useCreateCompanyMutation, useGetCompanyQuery } from "../../redux/slice/company/Company.js";
import { toast } from "react-toastify";

export default function Settings({ open }) {
  const { data } = useGetCompanyQuery()
  const [createCompany, { isLoading }] = useCreateCompanyMutation();

  const [inputValue, setInputValue] = useState({
    begin_date: "",
    end_date: "",
    study_price: "",
    hostel_price: "",
    imgs: "",
  });
  const addData = async () => {
    const formData = new FormData();
    formData.append('begin_date', inputValue.begin_date);
    formData.append('end_date', inputValue.end_date);
    formData.append('study_price', inputValue.study_price);
    formData.append('hostel_price', inputValue.hostel_price);
    formData.append('image', inputValue.img);

    try {
      await createCompany(formData).unwrap();
      toast.success(`Al-Xorazimiy ma'lumotlari  qo'shildi`);
    } catch (error) {
      toast.error(`Al-Xorazimiy ma'lumotlari  qo'shilmadi !!!`);
    }
  }
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, '0'); // Oy 0dan boshlansa, 2 raqam bo'ladi
    const day = `${today.getDate()}`.padStart(2, '0'); // Kun 0dan boshlansa, 2 raqam bo'ladi
    return `${year}-${month}-${day}`;
  };

  return (
    <div
      className={`fixed bottom-0 h-[89vh] w-80 bg-white border z-10 ${open === "settings" ? "right-0" : "-right-[20rem]"
        } transition-all duration-500 p-4 flex flex-col justify-between`}
    >
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <br />
        <div className="flex flex-col gap-5">
          <div className="col-span-1 row-span-1 relative">
            <input
              id="salary"
              name="user.salary"
              type="text"
              autoComplete="salary"
              placeholder="O'qish To'lovi"
              required
              pattern="[0-9]*"
              onChange={(e) => {
                const inputValueCopy = { ...inputValue };
                const inputSalary = e.target.value;
                inputValueCopy.study_price = inputSalary;
                setInputValue(inputValueCopy);
              }}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <span className="text-red-600" >
              {inputValue.salary !== null && isNaN(inputValue.study_price)
                ? <p className="text-red-600 absolute text-[12px] -bottom-4">Iltimos faqad raqam ishlating !</p>
                : ''}
            </span>
          </div>
          <div className="col-span-1 row-span-1 relative">
            <input
              id="salary"
              name="user.salary"
              type="text"
              autoComplete="salary"
              placeholder="Turar Joy Uchun To'lov"
              required
              pattern="[0-9]*"
              onChange={(e) => {
                const inputValueCopy = { ...inputValue };
                const inputSalary = e.target.value;
                inputValueCopy.hostel_price = inputSalary;
                setInputValue(inputValueCopy);
              }}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <span className="text-red-600" >
              {inputValue.salary !== null && isNaN(inputValue.hostel_price)
                ? <p className="text-red-600 absolute text-[12px] -bottom-4">Iltimos faqad raqam ishlating !</p>
                : ''}
            </span>
          </div>
          <input
            type="date"
            onChange={(e) => setInputValue({ ...inputValue, end_date: e.target.value })}
            value={inputValue.end_date || getCurrentDate()} // Hozirgi san'atni olish
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            type="date"
            onChange={(e) => setInputValue({ ...inputValue, begin_date: e.target.value })}
            value={inputValue.end_date || getCurrentDate()} // Hozirgi san'atni olish
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <ImageUpload
            title={"Logo"}
            iconName={<MdOutlineInsertPhoto className="text-5xl" />}
            iconTitle={"Rasmni Yuklash"}
            fileType={"PNG, JPG, JPEG 5mb gacha"}
            LabelFor={"imgs"}
            setInputValue={setInputValue}
            inputValue={inputValue}
          />
        </div>

      </div>


      <div className="flex items-center justify-between">
        <button
          onClick={() => addData()}
          className={`text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          disabled={isLoading}
        >
          {isLoading ? 'Yuborilmoqda...' : 'Saqlash'}
        </button>
      </div>
    </div>
  );
}
