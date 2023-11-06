import React, { useState } from "react";
import ParentPerTableComponent from "../parent_attendace/parentTable.jsx";
import { PiChatsCircleDuotone, PiStudent } from "react-icons/pi";
import { AiOutlineCalculator } from 'react-icons/ai';
import { BsCalendarDate, BsCoin } from "react-icons/bs";
import ParentProfileCom from "../parent_per/ParentProfile.jsx";
import ParentPerDebtsCom from "../parentPay/parentTable.jsx";
import ParentPayCom from "../parentPay/parentTablePay.jsx";
import ParentChatComponent from "../parentChat/index.jsx";

const tabs = [
  {
    id: "profile",
    label: "Profil",
    icon: PiStudent,
    component: ParentProfileCom,
  },
  {
    id: "davomat",
    label: "Davomat",
    icon: BsCalendarDate,
    component: ParentPerTableComponent,
  },
  {
    id: "chat",
    label: "Xabarlar",
    icon: PiChatsCircleDuotone,
    component: ParentChatComponent,
  },
  {
    id: "Xisobotlar",
    label: "Xisobotlar",
    icon: AiOutlineCalculator,
    component: ParentPerDebtsCom,
  },
  {
    id: "pay",
    label: "To'lovlar",
    icon: BsCoin,
    component: ParentPayCom,
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
