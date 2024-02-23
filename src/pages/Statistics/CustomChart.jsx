import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./ApexChart.css"; // Import custom CSS for styling

const ApexChart = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [CurrentWindowWidth, setCurrentWindowWidth] = useState(
    window.innerWidth
  );

  const series = [
    {
      name: "Sales Volume per L",
      group: "budget",
      data: [
        44000, 55000, 41000, 67000, 22000, 55000, 41000, 44000, 55000, 41000,
        41000, 44000, 55000, 41000,
      ],
    },
    {
      name: "Sales amount per SR",
      group: "budget",
      data: [
        13000, 36000, 20000, 8000, 13000, 36000, 20000, 8000, 13000, 36000,
        20000, 8000, 13000, 36000,
      ],
    },
  ];

  const options = {
    chart: {
      type: "bar",
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
      categories: [
        "MCJD-1016",
        "MCJD-1016",
        "MCJD-1016",
        "MCJD-1016",
        "MCJD-1016",
        "MCJD-1016",
        "MCJD-1016",
        "MCJD-1016",
        "MCJD-1016",
        "MCJD-1016",
        "MCJD-1016",
        "MCJD-1016",
        "MCJD-1016",
        "MCJD-1016",
      ],
    },
    fill: {
      opacity: 1,
    },
    colors: ["#56636F", "#8C9AA6"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize:
        CurrentWindowWidth > 1400 && CurrentWindowWidth < 1920
          ? "10px"
          : CurrentWindowWidth > 1920 && CurrentWindowWidth < 2560
          ? "20px"
          : CurrentWindowWidth > 2560 && CurrentWindowWidth < 3440
          ? "30px"
          : CurrentWindowWidth > 3400 && CurrentWindowWidth < 3841
          ? "35px"
          : CurrentWindowWidth < 1400
          ? "10px"
          : "50px",
    },
    responsive: [
      {
        breakpoint: 1919, // Change settings when window width is less than 1400px
        options: {
          yaxis: {
            labels: {
              style: {
                fontSize: "18px", // Adjust font size for smaller screens
              },
            },
          },
          axis: {
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
          yaxis: {
            labels: {
              style: {
                fontSize: "20px", // Adjust font size for smaller screens
              },
            },
          },
          axis: {
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
          yaxis: {
            labels: {
              style: {
                fontSize: "23px", // Adjust font size for smaller screens
              },
            },
          },
          axis: {
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
          yaxis: {
            labels: {
              style: {
                fontSize: "25px", // Adjust font size for smaller screens
              },
            },
          },
          axis: {
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
    setCurrentWindowWidth(window.innerWidth);
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
          CurrentWindowWidth > 1400 && CurrentWindowWidth < 1920
            ? 550
            : CurrentWindowWidth > 1920 && CurrentWindowWidth < 2560
            ? 600
            : CurrentWindowWidth > 2560 && CurrentWindowWidth < 3440
            ? 700
            : CurrentWindowWidth > 3400 && CurrentWindowWidth < 3841
            ? 750
            : CurrentWindowWidth < 1400
            ? 450
            : 700
        }
        width={windowWidth}
      />
    </div>
  );
};

export default ApexChart;
