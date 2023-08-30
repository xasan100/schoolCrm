import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAttandance } from "../../redux/slice/attandance/GetData";
import EmptyBox from "../EmptyBox/EmptyBox";
import Loader from "../Loader/Loader";
import { AiOutlineEye } from "react-icons/ai";

const TableItem = ({ users, index }) => {
  // JSX for each teacher
  const [userStatus, setUserStatus] = useState("");

  useEffect(() => {
    switch (userStatus) {
      case "KELGAN":
        setUserStatus("custom-green");
        break;
      case "SABABLI":
        setUserStatus("yellow-300");
        break;
      case "SABABSIZ":
        setUserStatus("red-400");
        break;
      default:
        setUserStatus("red-400");
    }
  }, [userStatus]);

  return (
    <li className="flex justify-between gap-x-6 px-2 py-3 cursor-pointer hover:bg-gray-200">
      <div className="flex min-w-0 gap-x-4">
        <h1>{index + 1}.</h1>
        <img
          className="h-12 w-12 flex-none rounded-full border"
          src={users?.image}
          alt="teacher_image"
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {users?.first_name}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {users?.last_name}
          </p>
        </div>
        <div
          className={`py-1 rounded-md shadow-sm border flex items-center justify-center px-2 bg-${userStatus}`}
        >
          <p className="text-white">{users?.davomat}</p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <AiOutlineEye className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Ko'rish
        </button>
      </div>
    </li>
  );
};

function AttandanceTableComponent() {
  const UsersData = useSelector((state) => state.Attendence);
  const status = "success";
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(GetAttandance());
  }, [dispatch]);

  const filteredTeachers = useMemo(() => {
    // Computing the filtered teachers list
    if (searchTerm) {
      return UsersData.data.filter(
        (users) =>
          users.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          users.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          users.middle_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return UsersData.data;
    }
  }, [UsersData.data, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  console.log(UsersData);

  return (
    <div className="h-ful gap-3 col-span-12">
      <div className="rounded-lg shadow-md col-span-12 grid grid-cols-12 border h-[75vh] items-start">
        <div className="col-span-12 flex items-center justify-between p-3">
          <div>
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
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Izlash..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="py-1.5 rounded-md shadow-sm border px-2 bg-custom-green">
              <p className="text-white">Kelgan</p>
            </div>
            <div className="py-1.5 rounded-md shadow-sm border px-2 bg-yellow-300">
              <p className="text-white">Sababli</p>
            </div>
            <div className="py-1.5 rounded-md shadow-sm border px-2 bg-red-400">
              <p className="text-white">Sababsiz</p>
            </div>
          </div>
          <select
            id="gender"
            name="gender"
            className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="teacher">O'qtuvchilar</option>
            <option value="student">O'quvchilar</option>
            <option value="employer">Xodimlar</option>
          </select>
        </div>
        {status === "loading" ? (
          <Loader
            extraClass="col-span-12 flex justify-center"
            Color="#62B238"
          />
        ) : filteredTeachers.length > 0 ? (
          <ul className="divide-y-reverse overflow-y-auto h-[68vh] divide-gray-100 border rounded-lg overflow-hidden col-span-12">
            {filteredTeachers.map((users, index) => (
              <TableItem users={users} index={index} key={users.id} />
            ))}
          </ul>
        ) : (
          <EmptyBox />
        )}
      </div>
    </div>
  );
}

export default React.memo(AttandanceTableComponent);
