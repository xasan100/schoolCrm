import React from "react";
import { PulseLoader } from "react-spinners";
import { useGetTotalQuery } from "../../redux/slice/general/generalStatisca.js";

// Statistic Card Component
const StatisticCard = ({ title, value, isLoading }) => {
    return (
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all mb-4 w-1/2 sm:w-1/3  sm:my-8">
            <div className="bg-white flex justify-center">
                <div className="sm:flex sm:items-start ">
                    <div className="text-center flex justify-center h-[80px] items-center flex-col gap-3 sm:mt-0 sm:ml-2 sm:text-left">
                        {isLoading ? (
                        'Loading'
                        ) : (
                            <>
                                <h3 className="text-xl leading-6 font-medium text-black-400">{title}</h3>
                                <p className="text-3xl font-bold text-black">{value}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const GeneralStatistics = () => {
    const { data, isLoading } = useGetTotalQuery();

    return (
        <div>
            <div className="max-w-full sm:mx-auto sm:px-6 lg:px-8">
                <div className="sm:flex justify-between sm:space-x-4">
                    {data?.map((val, index) => (
                        <React.Fragment key={index}>
                            <StatisticCard value={val.admins} title={'Adminlar'} isLoading={isLoading} />
                            <StatisticCard value={val.employers} title={'Xodimlar'} isLoading={isLoading} />
                            <StatisticCard value={val.students} title={"O'quvchilar"} isLoading={isLoading} />
                            <StatisticCard value={val.teachers} title={"O'qtuvchilar"} isLoading={isLoading} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GeneralStatistics;
