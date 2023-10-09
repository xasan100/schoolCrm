import React from "react";
import LessonTable from "../components/lessonTable/LessonTable";

export default function Lessons() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Dars Jadvali</h1>
      <LessonTable />
    </div>
  );
}
