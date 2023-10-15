import React, { useState } from "react";
import ExselLessonCreate from "./LessonExsel.jsx";
import { useGetLessonTableQuery, useGetLessonTimeQuery } from "../../redux/slice/lessonTable/LessonTableSlice.js";
import Loader from "../Loader/Loader.jsx";
import { BeatLoader } from "react-spinners";



export default function LessonTable() {
  const { data, isLoading } = useGetLessonTableQuery();
  const { data: dataTime, isLoading: isLoadingTime } = useGetLessonTimeQuery();



  const [day, setDay] = useState()

  const [inputValue, setInputValue] = useState(
    {
      classChange: '',

    }
  )


  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue({ classChange: newValue });
    const filteredData = data?.filter((value) => {
      return value?.class_title === newValue;
    });
    if (filteredData && filteredData.length > 0) {
      const lessonsData = filteredData.map((value) => {
        return value.lessons || [];
      });
      const flattenedLessonsData = lessonsData.reduce((acc, curr) => acc.concat(curr), []);
      setDay(flattenedLessonsData);
    } else {
      setDay([]);
    }
  };



  const table = [
    { day: "Dushanba", lessons: [{ text: "Ona-tili" }, { text: "Adabiyot" }] },
    {
      day: "Seshanba",
      lessons: [{ text: "Matematika" }, { text: "Rus-tili" }],
    },
    {
      day: "Chorshanba",
      lessons: [{ text: "Informatika" }, { text: "Manaviyat" }],
    },
    {
      day: "Payshanba",
      lessons: [{ text: "Biologiya" }, { text: "Ingiliz-tili" }],
    },
    { day: "Juma", lessons: [{ text: "Geografiya" }, { text: "Kimyo" }] },
    { day: "Shanba", lessons: [{ text: "Geometriya" }, { text: "Fizika" }] },
  ];


  return (
    <div className="container mx-auto">
      <div className=" flex justify-between h-[80px]">
        <h1 className="text-2xl font-bold">Dars Jadvali</h1>
        <div className="flex content-center gap-5">
          <ExselLessonCreate />
          <div>
            <select
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleInputChange}
            >
              {

                data?.map((val, index) => {

                  return (
                    <option key={index} value={val?.class_title}>{val?.class_title}</option>
                  )
                })
              }
            </select>
          </div>
        </div>

      </div>


      <div className="grid grid-cols-12 col-span-12 w-full  overflow-y-scroll h-[76vh]">

        <div className="col-span-1 grid grid-cols-12 items-end my-30">
          {
            dataTime?.map((val, index) => {
              return (
                <>
                  <span key={index + 1} className="my-30 col-span-full bg-lime-600 text-white flex justify-center items-center">{val?.begin_time}</span>
                  <span className="my-30 col-span-full bg-red-600 text-white flex justify-center items-center">{val?.end_time}</span>
                </>

              )
            })
          }
        </div>
        <div className="col-span-11  divide-x-2 divide-gray-300 border-2 ">
          <div className="grid grid-cols-6 gap-4 p-1" >
            {table?.map((item, i) => (
              <div key={i} className="h-[40px]  w-[150px] p-2 bg-yellow-400 rounded-md text-white flex items-center justify-center" >
                {item?.day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-6 gap-4 p-1">
            {isLoading ? (
              <h1>Loading...</h1>
            ) : day ? (
              day?.map((item, i) => (
                <div
                  key={i}
                  className="cursor-pointer h-[100px] w-[150px] p-2 bg-primary hover:bg-indigo-500 rounded-md text-white flex flex-col justify-around ite "
                >
                  <p className="text-[12px]">O': {item?.teacher || `O'qtuvchi Yo'q`}</p>
                  <p className="text-[14px]">F: {item?.fan || `Fan Yo'q`}</p>
                </div>
              ))
            ) : data ? (
              data?.slice(0, 1)?.map((v) =>
                v?.lessons?.map((e, i) => (
                  <div
                    key={i}
                    className="cursor-pointer h-[100px] w-[160px] p-2 bg-primary hover:bg-indigo-500 rounded-md text-white flex flex-col justify-around ite "
                  >
                    <p className="text-[12px]">O': {e?.teacher || `O'qtuvchi Yo'q`}</p>
                    <p className="text-[14px]">F: {e?.fan || `Fan Yo'q`}</p>
                  </div>
                ))
              )
            ) : null}
          </div>


        </div>

      </div>
    </div >
  );
}
