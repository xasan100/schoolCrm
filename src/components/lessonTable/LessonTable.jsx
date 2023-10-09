import React from "react";

const DayColumn = ({ lessons, title }) => {
  return (
    <div className="col-span-2 flex flex-col">
      <h1 className="border-b-2 text-center font-semibold">{title}</h1>
      <div className="flex flex-col h-full p-1 gap-1 py-2">
        {lessons.map((item, i) => (
          <div key={i} className="h-[50px] p-2 bg-green-400 rounded-md text-white">
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function LessonTable() {
  const table = [
    { day: "Dushanba", lessons: [{ text: "Ona-tili" }, { text: "Adabiyot" }] },
    {
      day: "Seshanba",
      lessons: [{ text: "Matematika" }, { text: "Rus-tili" }],
    },
    {
      day: "Chorshanba",
      lessons: [{ text: "Informatika" }, { text: "Manaviyat" }],
    },
    {
      day: "Payshanba",
      lessons: [{ text: "Biologiya" }, { text: "Ingiliz-tili" }],
    },
    { day: "Juma", lessons: [{ text: "Geografiya" }, { text: "Kimyo" }] },
    { day: "Shanba", lessons: [{ text: "Geometriya" }, { text: "Fizika" }] },
  ];
  return (
    <div className="grid grid-cols-12 col-span-12 w-full h-[75vh]">
      <div className="col-span-1 grid grid-cols-12 items-end">
        <span className="col-span-full">8:00</span>
        <span className="col-span-full">9:00</span>
        <span className="col-span-full">10:00</span>
        <span className="col-span-full">11:00</span>
        <span className="col-span-full">12:00</span>
        <span className="col-span-full">13:00</span>
        <span className="col-span-full">14:00</span>
        <span className="col-span-full">15:00</span>
        <span className="col-span-full">16:00</span>
        <span className="col-span-full">17:00</span>
      </div>
      <div className="col-span-11 grid grid-cols-12 divide-x-2 divide-gray-300 border-2">
        {table.map((item, index) => (
          <DayColumn key={index} title={item.day} lessons={item.lessons} />
        ))}
      </div>
    </div>
  );
}
