import React from "react";
import EmptyBox from "../../EmptyBox/EmptyBox.jsx";
import { FaUserTie } from "react-icons/fa";
// import View from "./View.jsx";
import Loader from "../../Loader/Loader.jsx";
import { useGetParentAttendanceQuery } from "../../../redux/slice/parent_profile/Parent_Profile.js";

const ParentItem = ({ parent, index }) => {
  return (
    <li className="flex justify-between gap-x-6 px-2 py-3 cursor-pointer hover:bg-gray-200">
      <div className="flex min-w-0 gap-x-4">
        <h1>{index + 1}.</h1>
        {parent?.user?.image && parent?.user.image !== "" ? (
          <img
            src={parent?.user_object.image}
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
            {parent?.user_object?.first_name}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {parent?.user_object?.last_name}
          </p>
        </div>

        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6">
            <span
              className={
                parent?.attendance_type === "SABABSIZ"
                  ? "text-red-700 "
                  : parent?.attendance_type === "KELGAN"
                  ? "text-green-500"
                  : parent?.attendance_type === "SABABLI"
                  ? "text-orange-500"
                  : "text-gray-900"
              }
            >
              {parent?.attendance_type}
            </span>
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {parent?.date || "Vaqti"}
          </p>
        </div>
        <div></div>
      </div>
      <div className="flex gap-2 items-center"></div>
    </li>
  );
};

function TeacherPerTableComponent() {
  const { data, isLoading } = useGetParentAttendanceQuery();
  return (
    <div className="h-ful gap-3 col-span-12">
      <div className="rounded-lg shadow-md col-span-12 grid grid-cols-12 border h-[75vh] items-start overflow-hidden">
        <div className="col-span-12 flex items-center justify-between "></div>
        {isLoading ? (
          <Loader
            extraClass="col-span-12 flex justify-center"
            Color="#62B238"
          />
        ) : data?.length > 0 ? (
          <ul className="divide-y-reverse overflow-y-scroll h-[68vh] divide-gray-100 border rounded-lg col-span-12">
            {data?.map((parent, index) => (
              <ParentItem parent={parent} index={index} key={parent.id} />
            ))}
          </ul>
        ) : (
          <EmptyBox />
        )}
      </div>
    </div>
  );
}

export default React.memo(TeacherPerTableComponent);
