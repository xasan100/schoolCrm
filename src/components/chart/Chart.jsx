import React from "react";
import { useEffect } from "react";
import { useState } from "react";
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

export default function Chart() {
  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];
  const year = [
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
    "2031",
    "2032",
    "2033",
    "2034",
  ];
  const data = [
    {
      name: "2023",
      kirim: 7231,
      chiqim: 1523,
      months: [
        {
          name: "january",
          kirim: 3210,
          chiqim: 5432,
          days: [
            { name: "1", kirim: 123, chiqim: 543 },
            { name: "2", kirim: 234, chiqim: 654 },
            { name: "3", kirim: 123, chiqim: 543 },
            { name: "4", kirim: 234, chiqim: 654 },
            { name: "5", kirim: 123, chiqim: 543 },
            { name: "6", kirim: 234, chiqim: 654 },
            { name: "7", kirim: 123, chiqim: 543 },
            { name: "8", kirim: 234, chiqim: 654 },
          ],
        },
        {
          name: "fevral",
          kirim: 4321,
          chiqim: 6543,
          days: [
            { name: "1", kirim: 345, chiqim: 765 },
            { name: "2", kirim: 456, chiqim: 876 },
          ],
        },
        {
          name: "mart",
          kirim: 5432,
          chiqim: 7654,
          days: [
            { name: "1", kirim: 567, chiqim: 987 },
            { name: "2", kirim: 678, chiqim: 1098 },
          ],
        },
      ],
    },
    {
      name: "2024",
      kirim: 7231,
      chiqim: 1523,
      months: [
        {
          name: "january",
          kirim: 3210,
          chiqim: 5432,
          days: [
            { name: "1", kirim: 123, chiqim: 543 },
            { name: "2", kirim: 234, chiqim: 654 },
            { name: "3", kirim: 123, chiqim: 543 },
            { name: "4", kirim: 234, chiqim: 654 },
            { name: "5", kirim: 123, chiqim: 543 },
            { name: "6", kirim: 234, chiqim: 654 },
            { name: "7", kirim: 123, chiqim: 543 },
            { name: "8", kirim: 234, chiqim: 654 },
          ],
        },
        {
          name: "fevral",
          kirim: 4321,
          chiqim: 6543,
          days: [
            { name: "1", kirim: 345, chiqim: 765 },
            { name: "2", kirim: 456, chiqim: 876 },
          ],
        },
        {
          name: "mart",
          kirim: 5432,
          chiqim: 7654,
          days: [
            { name: "1", kirim: 567, chiqim: 987 },
            { name: "2", kirim: 678, chiqim: 1098 },
          ],
        },
      ],
    },
  ];

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [changeMonths, setChangeMonths] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    if (selectedYear) {
      setChangeMonths(selectedYear.months);
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedMonth) {
      setDays(selectedMonth.days);
    }
  }, [selectedMonth]);

  const handleYearChange = (e) => {
    const year = data.find((y) => y.name === e.target.value);
    setSelectedYear(year);
    setSelectedMonth(null);
    setDays([]);
  };

  const handleMonthChange = (e) => {
    const month = data.months.find((m) => m.name === e.target.value);
    setSelectedMonth(month);
  };
  //882315771
  console.log(`oy:${changeMonths}`);
  return (
    <div className="h-[60vh]  col-span-11">
      <div>
      </div>
      <div className="flex justify-end gap-3">
        <select
          onChange={(e) => handleMonthChange(e)}
          id="gender"
          name="gender"
          className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:border-blue-500"
        >
          {months.map((e, i) => (
            <option key={i} value={e}>
              {e}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => handleYearChange(e)}
          id="gender"
          name="gender"
          className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:border-blue-500"
        >
          {year.map((e, i) => (
            <option key={i} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data[0].months[0].days}
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
