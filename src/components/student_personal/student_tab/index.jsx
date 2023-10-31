import React, {useState } from 'react';
import StudentPersonal from '../student_per/student_personal.jsx';
import StduntsPerTableComponent from "../student_attendace/studentTable.jsx"
import { PiStudent  } from 'react-icons/pi';
import { BsCalendarDate, BsCoin } from 'react-icons/bs';
import StduntsPerDebtsCom from "../studentPay/studentTable.jsx"
import { AiOutlineHome } from 'react-icons/ai';

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
            activeContent = <StduntsPerTableComponent />;
            break;
        case 'vazifalari':
            activeContent = 'Vazifalari';
            break;
        case 'tulovlar':
            activeContent = <StduntsPerDebtsCom />;
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
                    <p className='flex items-center gap-2'><PiStudent /> Profile</p>
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
                    <AiOutlineHome/>  Vazifalari
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
