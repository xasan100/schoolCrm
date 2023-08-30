import React from "react";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";

export default function EmptyBox() {
  return (
    <div className="flex items-center gap-5 col-span-12 justify-center">
      <h1 className="text-xl font-semibold">Malumotlar Yo'q</h1>
      <HiOutlineArchiveBoxXMark className="text-3xl" />
    </div>
  );
}
