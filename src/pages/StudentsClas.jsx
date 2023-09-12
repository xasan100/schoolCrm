import React from 'react'
import StudentsClasCom from "../components/studentsClas/StudentTable.jsx"
export const StudentsClas = () => {
    return (
        <div className="grid gap-4 grid-cols-12 p-4">
            <h1 className="text-2xl font-bold col-span-12">Sinflar</h1>
            <StudentsClasCom/>
        </div>
    )
}

export default StudentsClas