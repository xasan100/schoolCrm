import React, { useState } from "react";
import Logo from "../../assets/logo.png"
import BigImg from "../../assets/29124.png"
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineFileAdd, AiOutlineUserAdd } from "react-icons/ai";
const Sigin = () => {
  const [state, setState] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 ">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 h-full flex justify-center items-center flex-col">
          <div>
            <img src={Logo}
              className="w-[300px]" />
          </div>
          <div className="mt-12 flex flex-col items-center justify-center ">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Kirish
            </h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs relative">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="Foydalanuvchi Nomi"
                  onChange={(e) => setState({ state, username: e.target.value })}
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  autoComplete="current-password"
                  type="password" placeholder="Parol"
                  onChange={(e) => setState({ state, username: e.target.value })}
                  type={showPassword ? 'text' : 'password'}

                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEye
                      className="absolute top-4/4 text-xl right-7 cursor-pointer"
                    />

                  ) : (
                    <AiOutlineEyeInvisible
                        className="absolute top-5/1 text-xl right-7 cursor-pointer"
                    />
                  )}
                </button>

                <button
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">
                    Kirish
                  </span>
                </button>

              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center  hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center h-full flex justify-center items-center bg-no-repeat">
            <img src={BigImg} alt="BigImg" />
          </div>
        </div>
      </div>
    </div >
  );
};

export default Sigin;
