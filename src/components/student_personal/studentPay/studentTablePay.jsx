import React, { } from "react";
import EmptyBox from "../../EmptyBox/EmptyBox.jsx";
import { FaUserTie } from "react-icons/fa";
import { useGetStudentPaysQuery, useGetStudentsPaysQuery } from "../../../redux/slice/student_profile/Student_Profile.js";
import Loader from "../../Loader/Loader.jsx";


const TeacherItem = ({ teacher, index }) => {
  return (
    <li className="flex justify-between  px-2   cursor-pointer hover:bg-gray-200">
      <div className="flex min-w-0 gap-x-4">
        <h1>{index + 1}.</h1>
        {teacher?.user?.image && teacher?.user.image !== "" ? (
          <img
            src={teacher?.user_object.image}
            alt="Teacher"
            className="h-12 w-12 flex-none rounded-full border object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full border bg-gray-200 flex justify-center items-center">
            <FaUserTie className="text-3xl text-primary" />
          </div>
        )}
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {teacher?.comment}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {teacher?.amount}
          </p>
        </div>

        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900" >
            Tulov Kuni
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {teacher?.created_date}
          </p>
        </div>
        <div>

        </div>
      </div>

    </li>
  );
};

function StduntsTablePayComponent() {
  const { data, isLoading } = useGetStudentPaysQuery();
  return (
    <div className="h-ful gap-3 col-span-12">
      <div className="rounded-lg shadow-md col-span-12 grid grid-cols-12 border h-[55vh] items-start overflow-hidden">
        <div className="col-span-12 flex items-center justify-between ">
        </div>
        {isLoading ? (
          <Loader
            extraClass="col-span-12 flex justify-center"
            Color="#62B238"
          />
        ) : data?.length > 0 ? (
          <ul className="divide-y-reverse overflow-y-scroll h-[68vh] divide-gray-100 border rounded-lg col-span-12">
            {data?.map((teacher, index) => (
              <TeacherItem teacher={teacher} index={index} key={teacher.id} />
            ))}
          </ul>
        ) : (
          <EmptyBox />
        )}
      </div>
    </div>
  );
}

export default React.memo(StduntsTablePayComponent);







