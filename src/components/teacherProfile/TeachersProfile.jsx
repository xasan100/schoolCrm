import React from "react";

export default function TeachersProfile() {
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
              <p className="font-bold text-gray-700 text-xl">1</p>
              <p className="text-gray-400">Sinflarim</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">2</p>
              <p className="text-gray-400">Fanlarim</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
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
            </div>
          </div>
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Baho qo'yish
            </button>
            <button className="text-white py-2 px-4 uppercase rounded bg-blue-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Chat
            </button>
          </div>
        </div>
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            Muhammad Karimov,
            <span className="font-light text-gray-500">25</span>
          </h1>
          <p className="font-light text-gray-600 mt-3">Uzbeksitna, Namangan</p>
          <p className="mt-8 text-gray-500">Matematika va Informatika</p>
          <p className="mt-2 text-gray-500">University of Computer Science</p>
        </div>
        <div className="mt-12 flex flex-col justify-center">
          <p className="text-gray-600 text-center font-light lg:px-16">
            An artist of considerable range, Ryan — the name taken by
            Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
            records all of his own music, giving it a warm, intimate feel with a
            solid groove structure. An artist of considerable range.
          </p>
        </div>
      </div>
    </div>
  );
}
