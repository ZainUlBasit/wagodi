import React, { useState } from "react";

const MonthPicker = ({ selectedMonth, onChange }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthChange = (e) => {
    onChange(new Date(year, e.target.value, 1));
  };

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
  };

  return (
    <select
      value={selectedMonth.getMonth()}
      onChange={handleMonthChange}
      className="bg-white font-[Quicksand] outline-none font-bold h-full"
    >
      {months.map((month, index) => (
        <option key={index} value={index}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthPicker;
