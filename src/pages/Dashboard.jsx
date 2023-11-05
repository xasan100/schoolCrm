import React from "react";
import GeneralStatistics from "../components/chart/GeneralCom.jsx";
import Chart from "../components/chart/Chart.jsx"
import { useTheme } from "../components/context/index.jsx";

export default function Dashboard() {
  const { profile } = useTheme();
  let fin = ['Tasischi', 'Finance'];

  return (
    <div>
      <GeneralStatistics />
      <div className="grid gap-4 grid-cols-12">
        {fin.includes(profile?.type_dict?.title) ?
          < Chart />
          : ''
        }
      </div>
    </div>
  );
}
