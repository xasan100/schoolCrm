import React from "react";
import Chart from "../components/chart/Chart";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <h1 className="text-2xl font-bold col-span-12">Bosh Sahifa</h1>
      <Chart />
    </div>
  );
}
