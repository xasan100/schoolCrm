import React from "react";
import TeachersTable from "../components/teacher/TeachersTable";
import AddTeacher from "../components/teacher/AddTeacher";

export const Teachers = () => {
  return (
    <div className="grid gap-4 grid-cols-12 p-4">
      <h1 className="text-2xl font-bold col-span-12">O'qtuvchilar</h1>
      <AddTeacher />
      <TeachersTable />
    </div>
  );
};
export default Teachers;
