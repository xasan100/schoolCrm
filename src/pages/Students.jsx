import React from "react";
import StudentTable from "../components/students/studentTable.jsx"

export const Students = () => {
    return (
        <div className="grid gap-4 grid-cols-12 p-4">
            <h1 className="text-2xl font-bold col-span-12">O'quvchilar</h1>
            <StudentTable/>
        </div>
    );
};
         

export default Students;
