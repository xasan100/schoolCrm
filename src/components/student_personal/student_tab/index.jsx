import React, { useState } from 'react';
import StudentPersonal from '../student_per/student_personal.jsx';
import { BsCalendarDate, BsCoin } from 'react-icons/bs';
import { AiOutlineCalculator, AiOutlineHome } from 'react-icons/ai';
import StduntsPerDebtsCom from "../studentPersonalPay/studenDebts.jsx"
import StudenPayCom from "../studentPersonalPay/studentTablePay.jsx"
import StudentTableComponent from "../student_attendace/studentTable.jsx"
import TaskCard from "../tasks/Tasks.jsx"
import { PiStudent } from "react-icons/pi";
import LessonTableStudent from '../lesson_tabel/LessonTable.jsx';

const tabs = [
    {
        id: "profile",
        label: "Profil",
        icon: PiStudent,
        component: StudentPersonal,
    },
    {
        id: "davomat",
        label: "Davomat",
        icon: BsCalendarDate,
        component: StudentTableComponent,
    },
    {
        id: "vazifalari",
        label: "Vazifalari",
        icon: AiOutlineHome,
        component: TaskCard,
    },
    {
        id: "Xisobotlar",
        label: "Xisobotlar",
        icon: AiOutlineCalculator,
        component: StduntsPerDebtsCom,
    },

    {
        id: "pay",
        label: "To'lovlar",
        icon: BsCoin,
        component: StudenPayCom,
    },
    {
        id: "Lesson_table",
        label: "Dars Jadvali",
        icon: AiOutlineCalculator,
        component: LessonTableStudent,
    },
];

function PersonalTab() {
    const [activeTab, setActiveTab] = useState("profile");

    const ActiveContent = tabs.find((tab) => tab.id === activeTab)?.component || null;

    return (
        <div className="w-full max-w-screen-lg mx-auto p-4">
            <div className="flex flex-col sm:flex-row border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`flex items-center gap-2 py-2 px-4 focus:outline-none ${activeTab === tab.id
                            ? "border-b-2 border-blue-600"
                            : "border-b border-gray-200"
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <tab.icon className="text-xl" /> {tab.label}
                    </button>
                ))}
            </div>
            <div className="p-4">
                {ActiveContent ? <ActiveContent /> : "Contentni ko'rsatish kerak bo'lgan joyda misol tekstni qo'shing."}
            </div>
        </div>
    );
}

export default PersonalTab;

