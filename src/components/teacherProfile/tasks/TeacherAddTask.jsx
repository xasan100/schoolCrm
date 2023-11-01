import React from "react";
import { useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { toast } from "react-toastify";
import Modal from "../../../generic/Modal";
import InputField from "../../../generic/InputField";
import { useGetStudentsClassQuery } from "../../../redux/slice/studentsClas/studentsClas";
import { useCreateTeacherTaskMutation } from "../../../redux/slice/classTask/classTask";

export default function AddTask() {
  const { data, isLoading } = useGetStudentsClassQuery();
  const [createTeacherTask, { isLoading: taskLoading }] =
    useCreateTeacherTaskMutation();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState({
    task_title: "",
    task_message: "",
    complete_to_user: false,
    complete_from_user: false,
    from_user: 1,
    to_user: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await createTeacherTask(inputValue);
      toast.success("Topshiriq qo'shildi");
      setInputValue({
        task_title: "string",
        task_message: "string",
        to_class: 0,
      });
      setOpen(false);
    } catch (error) {
      toast.error(`Topshiriq qo'shishda xatolik: ${error}`);
    }
  };

  const onClose = () => setOpen(!open);
  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="bg-red-500 rounded-md shadow-md p-2 flex items-center justify-center cursor-pointer"
      >
        <GrAddCircle className="text-2xl" />
      </div>
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
