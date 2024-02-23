import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineColumnChart = () => {
  const series = [
    {
      name: "Sales Volume per L",
      type: "column",
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
      color: "#56636F",
    },
    {
      name: "Sales amount per SR",
      type: "line",
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
      color: "#8C9AA6",
    },
  ];

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
    labels: [
      "MCJD-1016",
      "MCJD-1017",
      "MCJD-1018",
      "MCJD-1019",
      "MCJD-1020",
      "MCJD-1021",
      "MCJD-1022",
      "MCJD-1023",
      "MCJD-1024",
      "MCJD-1025",
      "MCJD-1026",
      "MCJD-1027",
    ],
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
    responsive: [
      {
        breakpoint: 1919, // Change settings when window width is less than 1400px
        options: {
          xaxis: {
            labels: {
              style: {
                fontSize: "10px", // Adjust font size for smaller screens
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "18px", // Adjust font size for smaller screens
              },
            },
          },
        },
      },
      {
        breakpoint: 2540, // Change settings when window width is less than 1400px
        options: {
          xaxis: {
            labels: {
              style: {
                fontSize: "20px", // Adjust font size for smaller screens
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "20px", // Adjust font size for smaller screens
              },
            },
          },
        },
      },
      {
        breakpoint: 3440, // Change settings when window width is less than 1400px
        options: {
          xaxis: {
            labels: {
              style: {
                fontSize: "23px", // Adjust font size for smaller screens
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "23px", // Adjust font size for smaller screens
              },
            },
          },
        },
      },
      {
        breakpoint: 3800, // Change settings when window width is less than 1400px
        options: {
          xaxis: {
            labels: {
              style: {
                fontSize: "25px", // Adjust font size for smaller screens
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "25px", // Adjust font size for smaller screens
              },
            },
          },
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
