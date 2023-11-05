import React from "react";
import ComplateTask from "./ComplateTask";
import { useGetTeachersQuery } from "../../../redux/slice/teachers/TeachersSlice.js";
import { useGetStudenTaskQuery } from "../../../redux/slice/studentTask/StudentSlice.js";

const TaskCard = ({ task, color, keyword }) => {
  const { data: teachers } = useGetTeachersQuery();

  const fintTeacher = (id) => {
    const findObejct = teachers?.find((item) => item?.id === id);
    return {
      name: findObejct?.user?.first_name,
      last_name: findObejct?.user?.last_name,
    };
  };
  const { name, last_name } = fintTeacher(task?.to_user);

  return (
    <div className={`bg-${color}-400 rounded-md shadow-md p-2 group relative`}>
      <div className="text-white">
        <h1 className="font-bold">{task?.task_title}</h1>
        <p>{task?.task_message}</p>
      </div>
      <div className="bg-white p-1 w-max rounded-md">
        <h1>
          {name} {last_name}
        </h1>
      </div>
      <div className="flex gap-1 absolute top-1 right-1 invisible group-hover:visible duration-150">
 

      </div>
    </div>
  );
};

export default function Tasks() {
  const { data, isLoading } = useGetStudenTaskQuery();

  const filterTasks = (data) => {
    return {
      red: data.filter(
        (task) => !task.complete_from_user && !task.complete_to_user
      ),
      yellow: data.filter(
        (task) => task.complete_to_user && !task.complete_from_user
      ),
      green: data.filter(
        (task) => task.complete_to_user && task.complete_from_user
      ),
    };
  };

  const allTasks = isLoading
    ? { red: [], yellow: [], green: [] }
    : filterTasks(data);

  return (
    <div className="grid grid-cols-3 h-[78vh] col-span-12">
      <div className="col-span-1 bg-red-100 border-2 border-r-0 p-1 flex flex-col gap-2 overflow-y-scroll">
        {allTasks.red.map((e) => (
          <TaskCard task={e} color="red" keyword="complete_to_user" />
        ))}
      </div>
      <div className="col-span-1 bg-yellow-100 border-2 p-1 flex flex-col gap-2 overflow-y-scroll">
        {allTasks.yellow.map((e) => (
          <TaskCard task={e} color="yellow" keyword="complete_from_user" />
        ))}
      </div>
      <div className="col-span-1 bg-green-100 border-2 border-l-0 p-1 flex flex-col gap-2 overflow-y-scroll">
        {allTasks.green.map((e) => (
          <TaskCard task={e} color="green" />
        ))}
      </div>
    </div>
  );
}
