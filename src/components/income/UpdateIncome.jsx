import React, { useState } from "react";
import Modal from "../../generic/Modal";
import { toast } from "react-toastify";
import { useEffect } from "react";
import InputField from "../../generic/InputField";
import { useGetStudentsQuery } from "../../redux/slice/students/students";
import { useUpdateIncomeMutation } from "../../redux/slice/income/IncomeCrud";
import { LuEdit2 } from "react-icons/lu";

function UpdateIncome({ object }) {
  const [opne, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState({
    id: object?.id,
    amount: object?.amount,
    comment: object?.comment,
    student: object?.student?.id,
    type: object?.type,
  });
  const [updateIncome, { isLoading, isSuccess }] = useUpdateIncomeMutation();
  const { data } = useGetStudentsQuery();

  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (hasSubmitted) {
      if (isSuccess) {
        toast.success("Ma'lumot o'zgartirildi");
        setOpen(false);
      } else if (!isLoading && !isSuccess) {
        toast.error("Ma'lumot o'zgartirilmadi");
      }
    }
  }, [isSuccess, isLoading, hasSubmitted]);

  // Inputdagi qiymatni olganda raqam yoki raqam emasligini tekshirish uchun qo'shimcha funksiya
  const updateNestedValue = (obj, keys, value) => {
    const newObj = { ...obj }; // ob'ektning nusxasini olamiz
    let current = newObj;

    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] }; // nusxalar yordamida yangi ob'ekt yaratamiz
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    return newObj;
  };

  //Har bir inputdan qiymat olish
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    const newValue =
      keys.length > 1
        ? updateNestedValue(inputValue, keys, value)
        : { ...inputValue, [name]: value };

    setInputValue(newValue);
  };

  //O'qituvchi qo'shish
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setHasSubmitted(true);
      await updateIncome(inputValue);
      setHasSubmitted(false);
    } catch (error) {
      toast.error("Ma'lumot o'zgartishda xatolik", error.message);
    }
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
        <Modal closeModal={onClose} addFunc={handleSubmit} loader={isLoading}>
          <div className="grid sm:grid-rows-6 grid-cols-2 sx:grid-cols-1 gap-2">
            <InputField
              label="Qiymat"
              id="amount"
              value={inputValue.amount}
              name="amount"
              type="text"
              autoComplete="amount"
              handleChange={handleChange}
            />
            <InputField
              label="Izoh"
              id="comment"
              value={inputValue.comment}
              name="comment"
              type="text"
              autoComplete="comment"
              handleChange={handleChange}
            />
            <div className="col-span-2 row-span-1">
              <label
                htmlFor="children"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Farzandlar
              </label>
              <div className="mt-1.5">
                <select
                  defaultValue={object?.student?.id}
                  onChange={handleChange}
                  name="student"
                  id="student"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="0">Hech Qanday</option>
                  {data?.map((student) => (
                    <option key={student?.user?.id} value={student?.user?.id}>
                      {student?.user.first_name} &nbsp;
                      {student?.user?.last_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default UpdateIncome;
