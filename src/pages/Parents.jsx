import React from "react";
import TableParent from "../components/parents/TableParent";

export default function Parents() {
  return (
    <div className="grid gap-4 grid-cols-12 p-4">
      <h1 className="text-2xl font-bold col-span-12">Ota-Onalar</h1>
      <TableParent />
    </div>
  );
}
