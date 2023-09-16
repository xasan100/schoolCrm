import React from 'react';
import { GrUserAdmin } from 'react-icons/gr';
import { useGetGenralQuery } from '../../redux/slice/general/generalStatisca.js';

// Statistic Card Component
const StatisticCard = ({ title,value}) => {
    const { data, isLoading } = useGetGenralQuery();
 console.log(data);
   
    return (
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div className="bg-white  flex justify-center">
                <div className="sm:flex sm:items-start ">
                    <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <h3 className="text-sm leading-6 font-medium text-gray-400">{title}</h3>
                        <p className="text-3xl font-bold text-black">{value}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GeneralStatistics = () => {



    return (
        <div>
            <div className="max-w-full py-6 sm:mx-auto sm:px-6 lg:px-8">
                <div className="sm:flex justify-between sm:space-x-4">
                    <StatisticCard title='Adminlar' />
                    <StatisticCard title="O'qtuvchilar"  />
                    <StatisticCard title="O'quvchilar"  />
                    <StatisticCard title="Xodimlar"  />

                </div>
            </div>
        </div>
    );
};

export default GeneralStatistics;
