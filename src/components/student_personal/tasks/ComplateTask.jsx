import React from "react";
import { MdTaskAlt } from "react-icons/md";
import { toast } from "react-toastify";
import { useUpdateTaskMutation } from "../../../redux/slice/task/TaskCrud.js";
import { CircleLoader } from "react-spinners";
export default function ComplateTask({ object, keyWord }) {
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const handleSubmit = async (e) => {
    try {
      await updateTask(e);
      toast.success("Topshiriq bajarildi");
    } catch (error) {
      toast.error(`Topshiriq bajarishda xatolik: ${error}`);
    }
  };
  return (
    <button
      onClick={() => handleSubmit({ id: object.id, [keyWord]: true })}
      type="button"
      className="inline-flex items-center justify-center rounded-full bg-green-600 p-2 text-sm font-semibold text-white hover:text-black shadow-sm hover:bg-gray-300"
    >
      {isLoading ? (
        <CircleLoader Color="#fff" />
      ) : (
        <MdTaskAlt className="text-lg" aria-hidden="true" />
      )}
    </button>
  );
}
