import React from "react";
import FileUpload from "../FileUpload/FileUpload";
import { useGetTeacherLessonQuery } from "../../redux/slice/teacherLesson/TeacherLesson";

export default function TeachersLesson() {
  const { data } = useGetTeacherLessonQuery();
  console.log(data);
  return (
    <div className="grid gap-4">
      <h1>Dars Jadvali</h1>
      <form className="grid gap-3">
        <FileUpload />
        <button className="text-white py-2 px-4 uppercase rounded bg-blue-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
          Qo'shish
        </button>
      </form>
      <div></div>
    </div>
  );
}
