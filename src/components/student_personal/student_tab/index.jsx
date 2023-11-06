import React, { useState } from 'react';
import StudentPersonal from '../student_per/student_personal.jsx';
import { BsCalendarDate, BsCoin } from 'react-icons/bs';
import { AiOutlineCalculator, AiOutlineHome } from 'react-icons/ai';
import StduntsPerDebtsCom from "../studentPersonalPay/studenDebts.jsx"
import StudenPayCom from "../studentPersonalPay/studentTablePay.jsx"
import StudentTableComponent from "../student_attendace/studentTable.jsx"
import TaskCard from "../tasks/Tasks.jsx"
function StudenTab() {
    const [activeTab, setActiveTab] = useState('profile');
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    let activeContent;
    switch (activeTab) {
        case 'profile':
            activeContent = <StudentPersonal />;
            break;
        case 'davomat':
            activeContent = <StudentTableComponent/>;
            break;
        case 'vazifalari':
            activeContent = <TaskCard />;
            break;
        case 'Xisobotlar':
            activeContent = <StudenPayCom/>;
            break;
        case 'tulovlar':
            activeContent = <StduntsPerDebtsCom/>;
            break;
        default:
            activeContent = null;
    }

    return (
        <div className="w-full max-w-screen-lg mx-auto p-4">
            <div className="flex border-b border-gray-200">
                <button
                    className={`mr-4 py-2 px-4 focus:outline-none ${activeTab === 'profile' ? 'border-b-2' : ''
                        }`}
                    onClick={() => handleTabClick('profile')}
                >
                    <p className='flex items-center gap-2'> Profile</p>
                </button>
                <button
                    className={`flex items-center gap-2 mr-4 py-2 px-4 focus:outline-none ${activeTab === 'davomat' ? 'border-b-2' : ''}`}
                    onClick={() => handleTabClick('davomat')}
                >
                    <BsCalendarDate />    Davomat
                </button>
                <button
                    className={` flex items-center gap-2 mr-4 py-2 px-4 focus:outline-none ${activeTab === 'vazifalari' ? 'border-b-2' : ''
                        }`}
                    onClick={() => handleTabClick('vazifalari')}
                >
                    <AiOutlineHome />  Vazifalari
                </button>
                <button
                    className={`flex items-center gap-2 py-2 px-4 focus:outline-none ${activeTab === 'Xisobotlar' ? 'border-b-2' : ''
                        }`}
                    onClick={() => handleTabClick('Xisobotlar')}
                >
                    <AiOutlineCalculator /> Xisobotlar
                </button>

                <button
                    className={`flex items-center gap-2 py-2 px-4 focus:outline-none ${activeTab === 'tulovlar' ? 'border-b-2' : ''
                        }`}
                    onClick={() => handleTabClick('tulovlar')}
                >
                    <BsCoin /> Tulovlar
                </button>
            </div>
            <div className="p-4">{activeContent}</div>
        </div>
    );
}

export default StudenTab;
