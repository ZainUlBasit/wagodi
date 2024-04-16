import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineColumnChart = ({ Data }) => {
  const series = [
    {
      name: "Sales Volume per L",
      type: "column",
      data: Data.map((dt) => {
        return dt.salesVolume;
      }),
      color: "#56636F",
    },
    {
      name: "Sales amount per SR",
      type: "line",
      data: Data.map((dt) => {
        return dt.salesAmount;
      }),
      color: "#8C9AA6",
    },
  ];

  const Labels = Data.map((dt, index) => {
    return dt.stationName;
  });

  const options = {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false, // Hide the toolbar, including the hamburger menu button
      },
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: "",
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: Labels,
    xaxis: {
      type: "category",
      //   type: "datetime",
    },
    yaxis: [
      {
        opposite: true,
        title: {
          //   text: "Sales amount per SR",
        },
      },
      {
        title: {
          //   text: "Sales Volume per L",
        },
      },
    ],
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width when the component mounts and when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(
        window.innerWidth > 1400 && window.innerWidth < 1900
          ? 1500
          : window.innerWidth > 1900 && window.innerWidth < 2500
          ? 1900
          : window.innerWidth > 2500 && window.innerWidth < 3400
          ? 2500
          : window.innerWidth * 0.9
      );
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={
          windowWidth > 1400 && windowWidth < 1900
            ? 350
            : windowWidth > 1900 && windowWidth < 2500
            ? 450
            : windowWidth > 2500 && windowWidth < 3400
            ? 550
            : windowWidth < 1400
            ? 300
            : 650
        }
        width={windowWidth}
      />
    </div>
  );
};

export default LineColumnChart;
