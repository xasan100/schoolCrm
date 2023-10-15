import React from "react";
import IncomeTable from "../components/income/IncomeTable";

export default function Income() {
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <h1 className="text-2xl font-bold col-span-12">Kirim</h1>
      <IncomeTable />
    </div>
  );
}
