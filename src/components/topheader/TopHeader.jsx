import React, { useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";

export default function TopHeader() {
  const [day, setDay] = useState(true);

  return (
    <div className="shadow-lg flex justify-end p-4 bg-white">
      <div className="flex itmes-center gap-6">
        <span
          className={`hover:bg-gray-200 p-2 rounded-full text-3xl cursor-pointer select-none delay-150`}
          onClick={() => setDay(!day)}
        >
          {day ? <BsSun /> : <BsMoon />}
        </span>
        <span className="hover:bg-gray-200 p-2 rounded-full text-3xl cursor-pointer select-none delay-150">
          <FaRegUserCircle />
        </span>
      </div>
    </div>
  );
}
