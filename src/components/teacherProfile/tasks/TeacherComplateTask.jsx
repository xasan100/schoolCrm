import React from "react";
import { MdTaskAlt } from "react-icons/md";
import { toast } from "react-toastify";
import CircleLoader from "../../Loader/CircleLoader";
import { useUpdateTeacherTaskMutation } from "../../../redux/slice/classTask/classTask";

export default function ComplateTask({ object, keyWord }) {
  const [updateTeacherTask, { isLoading }] = useUpdateTeacherTaskMutation();
  const handleSubmit = async (e) => {
    try {
      await updateTeacherTask(e);
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
