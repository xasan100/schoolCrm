import React, { useContext } from "react";
import { ThemeContext } from "../context";
import { useGetTeachersClassQuery } from "../../redux/slice/teachers/TeachersSlice";

export default function TeachersProfile() {
  const { profile } = useContext(ThemeContext);
  const { data } = useGetTeachersClassQuery();
  return (
    <div className="p-4">
      <div className="p-8 bg-white shadow mt-14">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">30</p>
              <p className="text-gray-400">O'quvchilarim</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">
                {data?.class === null ? 0 : data?.class?.title}
              </p>
              <p className="text-gray-400">Sinflarim</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">
                {profile?.sciences?.length}
              </p>
              <p className="text-gray-400">Fanlarim</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500 overflow-hidden">
              {profile?.user?.image ? (
                <img
                  src={profile.user.image}
                  alt="profile_image"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button className="text-white py-2 px-4 uppercase rounded bg-red-500 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Chiqish
            </button>
            <button className="text-white py-2 px-4 uppercase rounded bg-blue-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Chat
            </button>
          </div>
        </div>
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            {profile?.user?.first_name} {profile?.user?.last_name}
          </h1>
          <p className="font-light text-gray-600 mt-3">{profile?.address}</p>
          <p className="mt-8 text-gray-500">
            {profile?.sciences_dict?.map((e) => e.title).join(", ")}
          </p>
          <p className="mt-2 text-gray-500">{profile?.user?.username}</p>
        </div>
        {/* <div className="mt-12 flex flex-col justify-center">
          <p className="text-gray-600 text-center font-light lg:px-16">
            An artist of considerable range, Ryan — the name taken by
            Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
            records all of his own music, giving it a warm, intimate feel with a
            solid groove structure. An artist of considerable range.
          </p>
        </div> */}
      </div>
    </div>
  );
}
