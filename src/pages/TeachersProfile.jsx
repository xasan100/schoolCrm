import React, { useState } from "react";
import { PiChatsCircleDuotone, PiStudent } from "react-icons/pi";
import { BsCalendarDate, BsCoin, BsJournalText } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import TeachersProfile from "../components/teacherProfile/TeachersProfile.jsx";
import Tasks from "../components/teacherProfile/tasks/TeacherTasks.jsx";
import TeachersSalary from "../components/teacherProfile/TeachersSalary.jsx";
import TeacherAttendence from "../components/teacherProfile/TeacherAttendence.jsx";

function TeacherTab() {
  const [activeTab, setActiveTab] = useState("profile");
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  let activeContent;
  switch (activeTab) {
    case "profile":
      activeContent = <TeachersProfile />;
      break;
    case "davomat":
      activeContent = <TeacherAttendence />;
      break;
    case "vazifalari":
      activeContent = <Tasks />;
      break;
    case "salary":
      activeContent = <TeachersSalary />;
      break;
    case "Xabarlar":
      //   activeContent = <StduntsPerDebtsCom />;
      break;
    case "Sinf jurnali":
      //   activeContent = <StduntsPerDebtsCom />;
      break;
    default:
      activeContent = null;
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4 h-[88vh] overflow-auto">
      <div className="flex border-b border-gray-200">
        <button
          className={`mr-4 py-2 px-4 focus:outline-none ${
            activeTab === "profile" ? "border-b-2" : ""
          }`}
          onClick={() => handleTabClick("profile")}
        >
          <p className="flex items-center gap-2">
            <PiStudent /> Profile
          </p>
        </button>
        <button
          className={`flex items-center gap-2 mr-4 py-2 px-4 focus:outline-none ${
            activeTab === "davomat" ? "border-b-2" : ""
          }`}
          onClick={() => handleTabClick("davomat")}
        >
          <BsCalendarDate /> Davomat
        </button>
        <button
          className={` flex items-center gap-2 mr-4 py-2 px-4 focus:outline-none ${
            activeTab === "vazifalari" ? "border-b-2" : ""
          }`}
          onClick={() => handleTabClick("vazifalari")}
        >
          <AiOutlineHome /> Vazifalari
        </button>
        <button
          className={`flex items-center gap-2 py-2 px-4 focus:outline-none ${
            activeTab === "salary" ? "border-b-2" : ""
          }`}
          onClick={() => handleTabClick("salary")}
        >
          <BsCoin /> Maoshlar tarixi
        </button>
        <button
          className={`flex items-center gap-2 py-2 px-4 focus:outline-none ${
            activeTab === "chat" ? "border-b-2" : ""
          }`}
          onClick={() => handleTabClick("chat")}
        >
          <PiChatsCircleDuotone className="text-xl" /> Xabarlar
        </button>
        {/* <button
          className={`flex items-center gap-2 py-2 px-4 focus:outline-none ${
            activeTab === "class-journal" ? "border-b-2" : ""
          }`}
          onClick={() => handleTabClick("class-journal")}
        >
          <BsJournalText /> Sinf jurnali
        </button> */}
      </div>
      <div className="p-4">{activeContent}</div>
    </div>
  );
}

export default TeacherTab;
