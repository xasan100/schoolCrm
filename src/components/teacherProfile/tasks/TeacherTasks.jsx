import React from "react";
import AddTask from "./TeacherAddTask";
import ComplateTask from "./TeacherComplateTask";
import DeleteTask from "./TeacherDeleteTask";
import UpdateTask from "./TeacherUpdateTask";
import { useGetTeacherTasksQuery } from "../../../redux/slice/classTask/classTask";
import { useGetStudentsClassQuery } from "../../../redux/slice/studentsClas/studentsClas";
import { useGetTeacherForClassQuery } from "../../../redux/slice/teachers/TeachersSlice";

const TaskCard = ({ task, color, keyword }) => {
  const { data: students } = useGetStudentsClassQuery();

  const fintTeacher = (id) => {
    const findObejct = students.find((item) => item.id === id);
    return {
      title: findObejct?.title,
    };
  };
  const { title } = fintTeacher(task?.to_class);

  return (
    <div className={`bg-${color}-400 rounded-md shadow-md p-2 group relative`}>
      <div className="text-white">
        <h1 className="font-bold">{task?.task_title}</h1>
        <p>{task?.task_message}</p>
      </div>
      <div className="bg-white p-1 w-max rounded-md">
        <h1>{title}</h1>
      </div>
      <div className="flex gap-1 absolute top-1 right-1 invisible group-hover:visible duration-150">
        {color !== "green" && <ComplateTask object={task} keyWord={keyword} />}
        <DeleteTask ID={task.id} />
        {color !== "green" && color !== "yellow" && (
          <UpdateTask object={task} />
        )}
      </div>
    </div>
  );
};

export default function Tasks() {
  const { data, isLoading } = useGetTeacherTasksQuery();

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
    : filterTasks(data?.length > 0 ? data : []);

  return (
    <div className="grid grid-cols-3 h-[78vh] col-span-12">
      <div className="col-span-1 bg-red-100 border-2 border-r-0 p-1 flex flex-col gap-2 overflow-y-scroll">
        <AddTask />
        {allTasks.red.map((e) => (
          <TaskCard
            key={e.id}
            task={e}
            color="red"
            keyword="complete_to_user"
          />
        ))}
      </div>
      <div className="col-span-1 bg-yellow-100 border-2 p-1 flex flex-col gap-2 overflow-y-scroll">
        {allTasks.yellow.map((e) => (
          <TaskCard
            key={e.id}
            task={e}
            color="yellow"
            keyword="complete_from_user"
          />
        ))}
      </div>
      <div className="col-span-1 bg-green-100 border-2 border-l-0 p-1 flex flex-col gap-2 overflow-y-scroll">
        {allTasks.green.map((e) => (
          <TaskCard key={e.id} task={e} color="green" />
        ))}
      </div>
    </div>
  );
}
