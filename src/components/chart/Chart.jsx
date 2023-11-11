import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetChartQuery } from "../../redux/slice/chart/chart";

export default function Chart() {
  const { data } = useGetChartQuery();
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [chart, setChart] = useState([]);

  useEffect(() => {
    // Yil o'zgartirilganda oy state'ini yangilash
    // Agar yil hozirgi yilga teng bo'lsa, oy state'ini hozirgi oyga o'rnatish
    if (year === currentYear) {
      setMonth(currentMonth);
    }
  }, [year, currentYear, currentMonth]);

  useEffect(() => {
    const selectedYearData = data?.find(
      (item) => item.name.toString() === year
    );
    const selectedMonthData = selectedYearData?.months.find(
      (monthItem) => monthItem.name === month
    );
    setChart(selectedMonthData?.days[0] || []);
  }, [data, year, month]);

  const changeData = (e) => {
    const { name, value } = e.target;
    if (name === "years") {
      setYear(value);
      const selectedYear = data.find((item) => item.name.toString() === value);
      setChart(selectedYear?.months[0] || []);
    } else if (name === "months") {
      setMonth(value);
      const selectedYearData = data.find(
        (item) => item.name.toString() === year
      );
      const selectedMonthData = selectedYearData?.months.find(
        (monthItem) => monthItem.name === value
      );
      setChart(selectedMonthData?.days[0] || []);
    }
  };

  return (
    <div className="h-[60vh]  col-span-11">
      <div></div>
      <div className="flex justify-end gap-3">
        <select
          onChange={(e) => changeData(e)}
          value={month} // Hozirgi oy qiymatini oldindan belgilash
          id="month"
          name="months"
          className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:border-blue-500"
        >
          {data
            ?.find((item) => item.name.toString() === year)
            ?.months.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
        </select>
        <select
          onChange={(e) => changeData(e)}
          id="year"
          name="years"
          className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:border-blue-500"
        >
          {data?.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chart}
          margin={{
            top: 5,
            right: 0,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="kirim"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="chiqim" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
