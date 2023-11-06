import React, { useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { useTheme } from "../../context/index.jsx";
import { useGetStudentPaysQuery } from "../../../redux/slice/student_profile/Student_Profile.js";
import EmptyBox from "../../EmptyBox/EmptyBox.jsx";

function StudenPayCom() {

  const { data, isLoading } = useGetStudentPaysQuery();
  const { profile } = useTheme()
  const [select, setSelect] = useState(
    {
      debtor: '',
      userName: '',
    }
  )
  return (
    <div>

      <div>
        <fieldset className="border border-solid border-gray-300 p-3 h-full">
          <legend>To'lovlar</legend>
          <div className="flex flex-col gap-4  overflow-y-scroll h-[68vh]">

            {
              isLoading ? 'Loading...' :

                data.length > 0 ?
                  data?.filter(item => {
                    const isDebtorMatch = (select?.debtor === 'true' ? item?.paid : select?.debtor === 'false' ? !item.paid : true);
                    return isDebtorMatch;
                  })
                    ?.filter(item => select?.userName ? item?.student?.user?.username === select?.userName : true)
                    ?.map((item, index) => (
                      <div key={index} className="flex   justify-start gap-5 items-center">
                        <div className="flex flex-col">
                          <div className="flex justify-center">
                            <h1 className="">{item?.student?.user?.first_name}</h1>
                          </div>
                          <div>
                            <img className="shadow-2xl rounded-full" width='100px' height='100px' src={item?.student?.user.image} alt={item?.student?.user?.first_name || <FaUserTie className="text-3xl text-primary" />} />
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
                    ))
                  : <EmptyBox />
            }
          </div>
        </fieldset>
      </div>
    </div>

  );
}

export default React.memo(StudenPayCom);

