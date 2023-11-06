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
    // chart bo'shligida hozirgi yil va oyning datalarini o'rnatish
    if (data && chart.length === 0) {
      const currentData = data.find(
        (item) => item.name.toString() === currentYear
      );
      const currentMonthData = currentData?.months.find(
        (monthItem) => monthItem.name === currentMonth
      );
      setChart(currentMonthData?.days[0] || []);
    }
    // Eslatma: data o'zgaruvchisining o'zgartirilishini kuzatib borish kerak
    // Agar data backenddan keladigan bo'lsa va har safar yangilanib tursa,
    // bu useEffect hukmi har safar ishga tushib qolishi mumkin.
  }, [data, chart, currentYear, currentMonth]);

  const changeData = (e) => {
    const { name, value } = e.target;
    if (name === "years") {
      const selectedYear = data?.find((item) => item.name.toString() === value);
      setChart(selectedYear?.months);
    } else if (name === "months") {
      const selectedMonth = data
        ?.find((item) => item.name.toString() === year)
        .months?.find((item) => item.name.toString() === value);
      setChart(selectedMonth?.days[0]);
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
