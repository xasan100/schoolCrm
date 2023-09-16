import React from "react";
import GeneralStatistics from "../components/chart/GeneralCom.jsx";
import Chart from "../components/chart/Chart.jsx"

export default function Dashboard() {
  return (
    <div>
      <GeneralStatistics />
      <div className="grid gap-4 grid-cols-12">
        <Chart />
      </div>
    </div>
  );
}
