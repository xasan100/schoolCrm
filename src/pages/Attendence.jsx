import React from "react";
import AttandanceTable from "../components/AttandanceTable/AttandanceTable";

export default function Attendence() {
  return (
    <div className="grid gap-4 grid-cols-12 p-4">
      <h1 className="text-2xl font-bold col-span-12">Davomat</h1>
      <AttandanceTable />
    </div>
  );
}
