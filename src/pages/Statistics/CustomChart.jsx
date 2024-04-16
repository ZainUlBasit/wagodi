import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./ApexChart.css"; // Import custom CSS for styling

const ApexChart = ({ Data }) => {
  const series = [
    {
      name: "Sales Volume per L",
      group: "budget",
      data: Data.map((dt) => {
        return dt.salesVolume;
      }),
    },
    {
      name: "Sales amount per SR",
      group: "budget",
      data: Data.map((dt) => {
        return dt.salesAmount;
      }),
    },
  ];

  const Cat = Data.map((dt, index) => {
    return dt.stationName;
  });

  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true, // Hide the toolbar, including the hamburger menu button
      },
    },
    stroke: {
      width: 0,
      colors: ["#fff"],
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "50%", // Set the bar height to 50% of the available space
        borderRadius: series[0].data.length < 10 ? 10 : 5,
      },
    },
    xaxis: {
      categories: Cat,
    },
    fill: {
      opacity: 1,
    },
    colors: ["#56636F", "#8C9AA6"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width when the component mounts and when the window is resized
  const handleResize = () => {
    setWindowWidth(
      window.innerWidth > 1250 && window.innerWidth < 1400
        ? (window.innerWidth - 500) * 0.8
        : window.innerWidth > 1050 && window.innerWidth < 1250
        ? 400
        : window.innerWidth > 1400 && window.innerWidth < 1900
        ? (window.innerWidth - 500) * 0.8
        : window.innerWidth > 1900 && window.innerWidth < 2500
        ? (window.innerWidth - 550) * 0.8
        : window.innerWidth > 2500 && window.innerWidth < 3400
        ? (window.innerWidth - 600) * 0.8
        : window.innerWidth > 3400
        ? (window.innerWidth - 700) * 0.8
        : window.innerWidth * 0.8
    );
  };
  useEffect(() => {
    handleResize();
  }, [window.innerWidth]);
  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="flex items-start -mt-7">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={
          windowWidth > 1400 && windowWidth < 1900
            ? 500
            : windowWidth > 1900 && windowWidth < 2500
            ? 550
            : windowWidth > 2500 && windowWidth < 3400
            ? 600
            : windowWidth > 3400
            ? 700
            : windowWidth < 1400
            ? 420
            : 650
        }
        width={windowWidth}
      />
    </div>
  );
};

export default ApexChart;
