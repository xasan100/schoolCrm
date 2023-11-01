import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { LuEdit2 } from "react-icons/lu";
import Modal from "../../../generic/Modal";
import InputField from "../../../generic/InputField";
import { useUpdateTeacherTaskMutation } from "../../../redux/slice/classTask/classTask";
import { useGetStudentsClassQuery } from "../../../redux/slice/studentsClas/studentsClas";

export default function UpdateTask({ object }) {
  const { data, isLoading } = useGetStudentsClassQuery();
  const [updateTask, { isLoading: taskLoading }] =
    useUpdateTeacherTaskMutation();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(object);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await updateTask(inputValue);
      toast.success("Topshiriq o'zgartirildi");
      setOpen(false);
    } catch (error) {
      toast.error(`Topshiriq o'zgartirishda xatolik: ${error}`);
    }
  };

  const onClose = () => setOpen(!open);
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="inline-flex items-center justify-center rounded-full bg-blue-500 p-2 text-sm font-semibold text-white hover:text-black shadow-sm hover:bg-gray-300"
      >
        <LuEdit2 className="text-lg" aria-hidden="true" />
      </button>
      {open && (
        <Modal closeModal={onClose} addFunc={handleSubmit} loader={taskLoading}>
          <div className="grid grid-cols-1 gap-2">
            <InputField
              label="Topshiriq nomi"
              id="task_title"
              name="task_title"
              type="text"
              autoComplete="task_title"
              handleChange={handleChange}
              value={inputValue.task_title}
            />
            <div className="col-span-1 row-span-1">
              <label
                htmlFor="to_user"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Kim uchun
              </label>
              <div className="mt-2">
                <select
                  defaultValue={inputValue.to_class}
                  id="to_user"
                  name="to_user"
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value={null}>Hech Qanday</option>
                  {!isLoading &&
                    data.map((item) => (
                      <option value={item.id}>{item.title}</option>
                    ))}
                </select>
              </div>
            </div>
            <div className="col-span-1 row-span-1 relative">
              <label
                htmlFor="salary"
                className="block text-sm font-medium leading-6 text-gray-900 w-72"
              >
                Batafsil
              </label>
              <div className="mt-2">
                <textarea
                  onChange={(e) => handleChange(e)}
                  value={inputValue.task_message}
                  name="task_message"
                  id=""
                  cols="30"
                  rows="5"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
