import React from "react";
import AddTask from "./AddTask";
import { useGetTasksQuery } from "../../redux/slice/task/TaskCrud";
import { useGetTeachersQuery } from "../../redux/slice/teachers/TeachersSlice";
import ComplateTask from "./ComplateTask";
import DeleteTask from "./DeleteTask";
import UpdateTask from "./UpdateTask";

export default function Tasks() {
  const { data, isLoading } = useGetTasksQuery();
  const { data: teachers } = useGetTeachersQuery();
  const redTasks = isLoading
    ? []
    : data.filter((task) => !task.complete_from_user && !task.complete_to_user);
  const yellowTasks = isLoading
    ? []
    : data.filter((task) => task.complete_to_user && !task.complete_from_user);
  const greenTasks = isLoading
    ? []
    : data.filter((task) => task.complete_to_user && task.complete_from_user);

  const fintTeacher = (id) => {
    const findObejct = teachers.find((item) => item.id === id);
    return {
      name: findObejct.user.first_name,
      last_name: findObejct.user.last_name,
    };
  };
  return (
    <div className="grid grid-cols-3 h-[78vh] col-span-12">
      <div className="col-span-1 bg-red-100 border-2 border-r-0 p-1 flex flex-col gap-2 overflow-y-scroll">
        <AddTask />
        {redTasks.map((e) => (
          <div
            key={e.id}
            className="bg-red-500 rounded-md shadow-md p-2 group relative"
          >
            <div className="text-white">
              <h1 className="font-bold">{e?.task_title}</h1>
              <p>{e?.task_message}</p>
            </div>
            <div className="bg-white p-1 w-max rounded-md">
              <h1>
                {fintTeacher(e?.to_user).name}{" "}
                {fintTeacher(e?.to_user).last_name}
              </h1>
            </div>
            <div className="flex gap-1 absolute top-1 right-1 invisible group-hover:visible duration-150">
              <ComplateTask object={e} keyWord="complete_to_user" />
              <UpdateTask object={e} />
              <DeleteTask ID={e.id} />
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-1 bg-yellow-100 border-2 p-1 flex flex-col gap-2 overflow-y-scroll">
        {yellowTasks.map((e) => (
          <div
            key={e.id}
            className="bg-yellow-500 rounded-md shadow-md p-2 group relative"
          >
            <div className="text-white">
              <h1 className="font-bold">{e?.task_title}</h1>
              <p>{e?.task_message}</p>
            </div>
            <div className="bg-white p-1 w-max rounded-md">
              <h1>
                {fintTeacher(e?.to_user).name}{" "}
                {fintTeacher(e?.to_user).last_name}
              </h1>
            </div>
            <div className="flex gap-1 absolute top-1 right-1 invisible group-hover:visible duration-150">
              <ComplateTask object={e} keyWord="complete_from_user" />
              <DeleteTask ID={e.id} />
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-1 bg-green-100 border-2 border-l-0 p-1 flex flex-col gap-2 overflow-y-scroll">
        {greenTasks.map((e) => (
          <div
            key={e.id}
            className="bg-green-500 rounded-md shadow-md p-2 group relative"
          >
            <div className="text-white">
              <h1 className="font-bold">{e?.task_title}</h1>
              <p>{e?.task_message}</p>
            </div>
            <div className="bg-white p-1 w-max rounded-md">
              <h1>
                {fintTeacher(e?.to_user).name}{" "}
                {fintTeacher(e?.to_user).last_name}
              </h1>
            </div>
            <div className="flex gap-1 absolute top-1 right-1 invisible group-hover:visible duration-150">
              <DeleteTask ID={e.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
