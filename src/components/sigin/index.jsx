import React, { useContext, useState } from "react";
import Logo from "../../assets/logo.png";
import BigImg from "../../assets/29124.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context";
import CustomInput from "react-phone-number-input/input";
import { toast } from "react-toastify";

const Sigin = () => {


  const { setProfile } = useContext(ThemeContext);
  const [state, setState] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {

    try {
      // POST so'rovini jo'natish
      const response = await axios.post(
        `${window.location.protocol}//${window.location.hostname}:8000/api/v1/token/`,
        state
      );
      if (response && response.data.access) {
        const token = response.data.access;
        sessionStorage.setItem("token", token);

        // GET so'rovini jo'natish
        const profileResponse = await axios.get(
          `${window.location.protocol}//${window.location.hostname}:8000/api/v1/users/me/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (profileResponse && profileResponse.data) {
          setProfile(profileResponse.data);
          sessionStorage.setItem(
            "profile",
            JSON.stringify(profileResponse.data)
          );

          navigate("/");
          window.location.reload();
          toast.success("Xush kelibsiz");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Kirishda xatolik Foydalanuvchi yoki Parol xato");
      } else {
        toast.error("Tizim xatosi");
      }
    }
  }
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      
      handleSubmit();
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 ">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 h-full flex justify-center items-center flex-col">
          <div>
            <img src={Logo} className="w-[300px]" alt="logo" />
          </div>
          <div className="mt-12 flex flex-col items-center justify-center ">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Kirish</h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs relative">
                <CustomInput
                  placeholder="Telfon raqam"
                  maxLength={17}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  autoComplete="current-password"

                  onChange={(e) =>
                    setState({ ...state, username: e })} />
                <input
                  onKeyDown={(e) => handleEnter(e)}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  autoComplete="current-password"
                  placeholder="Parol"
                  onChange={(e) =>
                    setState({ ...state, password: e.target.value })
                  }
                  type={showPassword ? "text" : "password"}
                />
                <p
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEye className="absolute top-[110px] text-xl right-7 cursor-pointer" />
                  ) : (
                    <AiOutlineEyeInvisible className="absolute top-[110px] text-xl right-7 cursor-pointer" />
                  )}
                </p>
                <button
                  onClick={() => handleSubmit()}
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span>Kirish</span>
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
    </div>
  );
};

export default Sigin;
