import React from "react";
import TeachersTable from "../components/teacher/TeachersTable";

export const Teachers = () => {
  return (
    <div className="grid gap-4 grid-cols-12 p-4">
      <h1 className="text-2xl font-bold col-span-12">O'qituvchilar</h1>
      <TeachersTable />
    </div>
  );
};
export default Teachers;
