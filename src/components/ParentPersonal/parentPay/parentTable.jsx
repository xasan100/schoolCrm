import React, { useState } from "react";
import EmptyBox from "../../EmptyBox/EmptyBox.jsx";
import { FaUserTie } from "react-icons/fa";
import Loader from "../../Loader/Loader.jsx";
import View from "./View.jsx";
import { useGetParentDebtsQuery, useGetParentPaysQuery } from "../../../redux/slice/parent_profile/Parent_Profile.js";
import { useTheme } from "../../context/index.jsx";


// const TeacherItem = ({ teacher, index }) => {

//   return (
//     <li className="flex justify-between gap-x-6 px-2 py-3 cursor-pointer hover:bg-gray-200">
//       <div className="flex min-w-0 gap-x-4">
//         <h1>{index + 1}.</h1>
//         {teacher?.user?.image && teacher?.user.image !== "" ? (
//           <img
//             src={teacher?.user.image} // Fix the property name
//             alt="Teacher"
//             className="h-12 w-12 flex-none rounded-full border object-cover"
//           />
//         ) : (
//           <div className="w-12 h-12 rounded-full border bg-gray-200 flex justify-center items-center">
//             <FaUserTie className="text-3xl text-primary" />
//           </div>
//         )}
//         <div className="min-w-0 flex-auto">
//           <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//             {/* Fix this part */}
//             {teacher?.user?.name || 'No Name'}
//           </p>
//           <p className="text-sm font-semibold leading-6 text-gray-900">
//             {/* Check if created_date is defined before slicing */}
//             {teacher?.created_date ? teacher.created_date.slice(0, 7) : ''}
//           </p>
//         </div>
//         <div className="min-w-0 flex-auto">
//           <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//             {teacher?.paid ? `To'langan` : 'qarzdor'}miqdori
//           </p>
//           <p className="text-sm font-semibold leading-6 text-gray-900">
//             {/* Fix this part */}
//             {teacher?.balance || 'Vaqti'}
//           </p>
//         </div>
//         <div></div>
//       </div>
//       <div className="flex gap-2 items-center">
//         <View object={teacher} />
//         <div className="flex flex-col justify-between">
//           <b className="mt-1 truncate text-xs leading-5 text-gray-500">Umumiy Narx</b>
//           <b>{teacher.price}</b>
//         </div>
//       </div>
//     </li>
//   );
// };

function StduntsPerDebtsCom() {
  const { data } = useGetParentDebtsQuery();
  const { profile } = useTheme()
  const [select, setSelect] = useState(
    {
      debtor: '',
      userName: '',
    }
  )


  console.log(select, 'select');
  return (
    <div>
      <div className="flex justify-end gap-4">
        <select onChange={(e) => setSelect({ ...select, debtor: e.target.value })}>
          <option value=''>Qarzdor</option>
          <option value='true'>To'lanagan</option>
          <option value='false'>To'lanmagan</option>
        </select>
        <select onChange={(e) => setSelect({ ...select, userName: e.target.value })}>
          <option value="">Farzadlar</option>
          {profile?.children_dict?.map((value) => {
            return <option key={value.id} value={value?.user?.username}>{value?.user.first_name}</option>

          })}
        </select>
      </div>
      <div>
        <fieldset className="border border-solid border-gray-300 p-3 h-full">
          <legend>To'lovlar</legend>
          <div className="flex flex-col gap-4 overflow-y-scroll h-[68vh]">

            {
              data?.filter(item => {
                const isDebtorMatch = (select?.debtor === 'true' ? item.paid : select?.debtor === 'false' ? !item.paid : true);
                return isDebtorMatch;
              })
                .filter(item => select?.userName ? item.student.user.username === select?.userName : true)
                .map((item, index) => (
                <div key={index} className="flex   justify-start gap-5 items-center">
                  <div className="flex flex-col">
                    <div className="flex justify-center">
                      <h1 className="">{item.student.user.first_name}</h1>
                    </div>
                    <div>
                      <img className="shadow-2xl rounded-full" width='100px' height='100px' src={item.student.user.image} alt={item.student.user.first_name || <FaUserTie className="text-3xl text-primary" />} />
                    </div>
                  </div>

                  <div className="flex justify-between gap-5">
                    <div className="flex flex-col items-center">
                      <h1>Qolgan qarzdorlik</h1>
                      <h1>{item?.balance}</h1>
                    </div>
                    <div className="flex flex-col items-center">
                      <h1>Anashu oy uchun o'qish narxi</h1>
                      <h1>{item.price}</h1>
                    </div>
                    <div>
                      <h1 >{item.paid ? <h1 className="text-green-600 font-semibold">To'lagan</h1> : <h1 className="text-red-700 font-semibold">Qarzdor</h1>}</h1>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </fieldset>
      </div>
    </div>
    // <div className="h-ful w-full  gap-3 col-span-12">
    //   <div className="rounded-lg shadow-md col-span-12 grid grid-cols-12 border h-[75vh] items-start overflow-hidden">
    //     <div className="col-span-12 flex items-center justify-between ">
    //     </div>
    //     {isLoading ? (
    //       <Loader
    //         extraClass="col-span-12 flex justify-center"
    //         Color="#62B238"
    //       />
    //     ) : data?.length > 0 ? (
    //       <ul className="divide-y-reverse  overflow-y-scroll h-[68vh] divide-gray-100 border rounded-lg col-span-12">
    //         {data?.map((teacher, index) => (
    //           <TeacherItem teacher={teacher} index={index} key={teacher.id} />
    //         ))}
    //       </ul>
    //     ) : (
    //       <EmptyBox />
    //     )}
    //   </div>
    // </div>
  );
}

export default React.memo(StduntsPerDebtsCom);







