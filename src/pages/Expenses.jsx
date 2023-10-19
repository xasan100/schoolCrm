import React from "react";
import ExpenseTable from "../components/expense/ExpenseTable";

export default function Expenses() {
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <h1 className="text-2xl font-bold col-span-12">Chiqim</h1>
      <ExpenseTable />
    </div>
  );
}
