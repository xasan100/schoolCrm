import React, { useState } from "react";
import Modal from "../../generic/Modal";
import { toast } from "react-toastify";
import { useEffect } from "react";
import InputField from "../../generic/InputField";
import { memo } from "react";
import { useUpdateExpenseMutation } from "../../redux/slice/expense/ExpenseCrud";
import { useGetTeachersQuery } from "../../redux/slice/teachers/TeachersSlice";
import { LuEdit2 } from "react-icons/lu";

function UpdateExpense({ object }) {
  const [opne, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState({
    id: object.id,
    amount: object.amount,
    comment: object.comment,
    user: object.user,
    type: object.type,
  });
  const [updateExpense, { isLoading, isSuccess }] = useUpdateExpenseMutation();
  const { data } = useGetTeachersQuery();

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

  //Har bir inputga qiymat berilgan yoki berilmaganini tekshirish
  const isAnyFieldEmpty = (input) => {
    for (let key in input) {
      const value = input[key];

      if (typeof value === "object" && value !== null) {
        // null qiymatini "ob'ekt" sifatida hisoblamaslik uchun shart qo'shdim
        if (Array.isArray(value) && value.length === 0) {
          return true;
        }
        if (isAnyFieldEmpty(value)) {
          // Ichidagi ob'ektlarni rekursiv tekshirish
          return true;
        }
      } else if (value === "" || value === null || value === undefined) {
        // Bo'sh qiymatlarni aniq tekshirish
        return true;
      }
    }
    return false;
  };

  const isDisabled = isAnyFieldEmpty(inputValue);

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
      await updateExpense(inputValue);
      setHasSubmitted(false);
    } catch (error) {
      toast.error("Ma'lumot o'zgartirishda xatolik", error.message);
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
        <Modal
          closeModal={onClose}
          addFunc={handleSubmit}
          loader={isLoading}
          isDisabled={isDisabled}
        >
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
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="user"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Xodimlar
              </label>
              <div className="mt-1.5">
                <select
                  onChange={handleChange}
                  defaultValue={inputValue.user}
                  name="user"
                  id="user"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="0">Hech Qanday</option>
                  {data?.map((teacher) => (
                    <option key={teacher.user.id} value={teacher.user.id}>
                      {teacher.user.first_name} &space;
                      {teacher.user.last_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="expense_type"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Nima uchun
              </label>
              <div className="mt-1.5">
                <select
                  defaultValue={inputValue.type}
                  onChange={handleChange}
                  name="type"
                  id="expense_type"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Hech Qanday</option>
                  <option value="SALARY">Oylik</option>
                  <option value="OTHER">Boshqa harajat</option>
                </select>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

const MemoizeAddExpense = memo(UpdateExpense);

export default MemoizeAddExpense;
