import React, { useState } from "react";
import { FaUserTie } from "react-icons/fa";
import {  useGetParentPaysQuery } from "../../../redux/slice/parent_profile/Parent_Profile.js";
import { useTheme } from "../../context/index.jsx";

function ParentPayCom() {
  const { data, isLoading } = useGetParentPaysQuery();
  const { profile } = useTheme()
  console.log(isLoading, 'isLoading');
  const [select, setSelect] = useState(
    {
      debtor: '',
      userName: '',
    }
  )

  return (
    <div>
      <div className="flex justify-end gap-4">
        {
          profile?.children_dict.length >1 && 
        <select onChange={(e) => setSelect({ ...select, userName: e.target.value })}>
          <option value="">Farzadlari</option>
          {profile?.children_dict?.map((value) => {
            return <option key={value.id} value={value?.user?.username}>{value?.user.first_name}</option>

          })}
            </select>
        }
      </div>
      <div>
        <fieldset className="border border-solid border-gray-300 p-3 h-full">
          <legend>To'lovlar</legend>
          <div className="flex flex-col gap-4  overflow-y-scroll h-[68vh]">

            {
              isLoading ? 'Loading...' :
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
                          <h1>To'langan miqdori</h1>
                          <h1>{item?.amount} &nbsp; so'm</h1>
                        </div>
                        <div className="flex flex-col items-center">
                          <h1>To'langan sana</h1>
                          <h1>{item?.created_date} </h1>
                        </div>
                        <div className="flex flex-col items-center">
                          <h1>Izoh</h1>
                          <h1>{item?.comment || 'Izoh qoldirilmagan'} </h1>
                        </div>
                      </div>
                    </div>
                  ))}
          </div>
        </fieldset>
      </div>
    </div>

  );
}

export default React.memo(ParentPayCom);







