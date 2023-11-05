import React from "react";
import { useTheme } from "../../context/index.jsx";
import { useNavigate } from "react-router-dom";

export default function ParentProfileCom() {
  const { profile: object } = useTheme();
  const navigate = useNavigate();

  const logOut = (keys) => {
    keys.forEach((key) => sessionStorage.removeItem(key));
    navigate("/login");
  };


  return (
    <div className="p-4">
      <div className="p-8 bg-white shadow mt-14">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">
                {object?.children?.length || 0}
              </p>
              <p className="text-gray-400">Farzandlarim</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">100</p>
              <p className="text-gray-400">Xabarlarim</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">4</p>
              <p className="text-gray-400">To'lovlarim</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              {object?.user?.image && object?.user?.image !== "" ? (
                <img
                  src={object?.user.image}
                  alt="avatar"
                  className="mx-auto rounded-full w-40 h-40 object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button
              onClick={() => logOut(["token", "profile"])}
              className="text-white py-2 px-4 uppercase rounded-lg bg-red-500 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            >
              Chiqish
            </button>
            <button className="text-white py-2 px-4 uppercase rounded-lg bg-blue-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Chat
            </button>
          </div>
        </div>
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700 capitalize">
            {object.user.first_name} {object.user.last_name}
          </h1>
        </div>
      </div>
    </div >
  );


}
