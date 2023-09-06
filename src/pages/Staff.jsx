import React from "react";
import ReadStaff from "../components/staff/ReadStaff";

export default function Staff() {
  return (
    <div className="grid gap-4 grid-cols-12 p-4">
      <h1 className="text-2xl font-bold col-span-12">Xodimlar</h1>
      <ReadStaff />
    </div>
  );
}
