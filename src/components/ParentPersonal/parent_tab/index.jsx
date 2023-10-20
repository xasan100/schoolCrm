import React, { useState } from "react";
import ParentPerTableComponent from "../parent_attendace/parentTable.jsx";
import { PiChatsCircleDuotone, PiStudent } from "react-icons/pi";
import { BsCalendarDate, BsCoin } from "react-icons/bs";
import ParentProfileCom from "../parent_per/ParentProfile.jsx";

const tabs = [
  {
    id: "profile",
    label: "Profile",
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
    content: "Xabarlar",
  },
  { id: "payment", label: "To'lovlar", icon: BsCoin, content: "To'lovlar" },
];

function PersonalTab() {
  const [activeTab, setActiveTab] = useState("profile");

  const ActiveContent =
    tabs.find((tab) => tab.id === activeTab).component || null;

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center gap-2 mr-4 py-2 px-4 focus:outline-none ${
              activeTab === tab.id ? "border-b-2 border-blue-600" : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="text-xl" /> {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {ActiveContent ? (
          <ActiveContent />
        ) : (
          tabs.find((tab) => tab.id === activeTab).content
        )}
      </div>
    </div>
  );
}

export default PersonalTab;
