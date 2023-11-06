/** @format */
import React, { useEffect, useState } from "react";
import { useGetAttendanceQuery } from "../../redux/slice/attandance/Attendance.js";
import Addattandance from "./Addattandance.jsx";
import EmptyBox from "../EmptyBox/EmptyBox.jsx";

function AttandanceTableComponent() {
  const { data, isLoading } = useGetAttendanceQuery();
  const [type, setType] = useState("all");
  const [select, setSelect] = useState("all");

  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = filteredData?.filter((users) => {
    const username = users?.user_object?.first_name?.toLowerCase();
    const firstName = users?.user_object?.last_name?.toLowerCase();
    const davomat = users?.davomat?.toLowerCase();
    const lowerCaseSearchQuery = searchQuery?.toLowerCase();
    return (
      username?.includes(lowerCaseSearchQuery) ||
      firstName?.includes(lowerCaseSearchQuery) ||
      davomat?.includes(lowerCaseSearchQuery)
    );
  });

  useEffect(() => {
    let typesToFilter = [type];
    if (type === "employer") {
      typesToFilter = ["employer", "tasischi", "admin"];
    }
    const result =
      type === "all"
        ? data
        : data?.filter((user) =>
            typesToFilter?.includes(user.user_object.type_user)
          );
    setFilteredData(result);
    filter();
  }, [type, data, select]);

  const filter = () => {
    if (select === "all") {
      setFilteredData(data);
    } else {
      const filteredData = data.filter((val) => val.attendance_type === select);
      setFilteredData(filteredData);
    }
  };
  useEffect(() => {
    let typesToFilter = [type];
    if (type === "employer") {
      typesToFilter = ["employer", "tasischi", "admin"];
    }
    const result =
      type === "all"
        ? data
        : data?.filter((user) =>
            typesToFilter?.includes(user.user_object.type_user)
          );
    setFilteredData(result);
  }, [type, data]);

  return (
    <div className="h-ful gap-3 col-span-12">
      <div className="rounded-lg shadow-md col-span-12 grid grid-cols-12 border h-[75vh] items-start">
        <div className="col-span-12 flex flex-col md:flex-row items-start md:items-center justify-between p-3 gap-4">
          <div className="w-full md:w-auto">
            <label htmlFor="table-search" className="sr-only">
              Qidirish
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg md:w-80 lg:w-96 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Izlash..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <select
            onChange={(e) => {
              setSelect(e.target.value);
              filter();
            }}
            id="attendance-filter"
            name="attendance-filter"
            className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Hammasi</option>
            <option value="KELGAN">KELGAN</option>
            <option value="SABABLI">SABABLI</option>
            <option value="SABABSIZ">SABABSIZ</option>
          </select>

          <select
            onChange={(e) => setType(e.target.value)}
            id="gender"
            name="gender"
            className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="teacher">O'qtuvchilar</option>
            <option value="student">O'quvchilar</option>
            <option value="employer">Xodimlar</option>
          </select>
          <div>
            <Addattandance />
          </div>
        </div>

        <ul className="divide-y-reverse overflow-y-auto h-[68vh] divide-gray-100 border rounded-lg overflow-hidden col-span-12">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : filteredUsers?.length > 0 ? (
            filteredUsers?.map((users, index) => (
              <li
                key={index}
                className="flex justify-between gap-x-6 px-2 py-3 cursor-pointer hover:bg-gray-200"
              >
                <div className="flex min-w-0 gap-x-4">
                  <h1>{index + 1}.</h1>
                  <img
                    className="h-12 w-12 flex-none rounded-full border"
                    src={
                      users?.user_dict?.image ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG6a6KfKK66Jy1eCuDau7yp2rb5dIfGvl45g&usqp=CAU"
                    }
                    alt="teacher_image"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {users?.user_object?.first_name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {users?.user_object?.last_name}
                    </p>
                  </div>
                  {/* <p>{users?.user_object?.type_user}</p> */}
                  <div>
                    <p
                      className={` text-white py-1.5 rounded-md shadow-sm border px-2 cursor-pointer   ${
                        users?.attendance_type === "KELGAN" && "bg-custom-green"
                      }  ${
                        users?.attendance_type === "SABABLI" && "bg-yellow-300"
                      }  ${
                        users?.attendance_type === "SABABSIZ" && "bg-red-400"
                      } `}
                    >
                      {users?.attendance_type}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  {/* <button
                    type='button'
                    className='inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                    <AiOutlineEye
                      className='-ml-0.5 mr-1.5 h-5 w-5'
                      aria-hidden='true'
                    />
                    Ko'rish
                  </button> */}
                </div>
              </li>
            ))
          ) : (
            <EmptyBox />
          )}
        </ul>
      </div>
    </div>
  );
}

export default React.memo(AttandanceTableComponent);
