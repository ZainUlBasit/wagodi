import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./Style.css";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import OrderManagerNavbar from "../../components/Navbar/OrderManagerNavbar";
// import "react-tabs/style/react-tabs.css";
const AddReservation = () => {
  const [CurrentTabNumber, setCurrentTabNumber] = useState(0);
  return (
    <>
      <OrderManagerNavbar />
      <Tabs
        className="flex justify-center flex-col items-center"
        //   onSelect={handleTabChange} // Call handleTabChange when a tab is selected
        selectedIndex={CurrentTabNumber} // Set the selected tab index
      >
        <TabList className="flex w-[718px] justify-between">
          <Tab
            className={`Tab ${
              CurrentTabNumber === 0 ||
              CurrentTabNumber === 1 ||
              CurrentTabNumber === 2
                ? "bg-[#465462]"
                : "bg-[#96ADC5]"
            } text-[white] w-10 h-10 flex justify-center items-center relative z-[1] rounded-[50%] outline-none font-[Quicksand] select-none`}
          >
            1
          </Tab>
          <Tab
            className={`Tab ${
              CurrentTabNumber === 1 || CurrentTabNumber === 2
                ? "bg-[#465462]"
                : "bg-[#96ADC5]"
            } text-[white] w-10 h-10 flex justify-center items-center relative z-[1] rounded-[50%] outline-none font-[Quicksand] select-none`}
          >
            2
          </Tab>
          <Tab
            className={`${
              CurrentTabNumber === 2 ? "bg-[#465462]" : "bg-[#96ADC5]"
            } text-[white] w-10 h-10 flex justify-center items-center relative z-[1] rounded-[50%] outline-none font-[Quicksand] select-none`}
          >
            3
          </Tab>
        </TabList>

        <TabPanel>
          <Step1
            CurrentTabNumber={CurrentTabNumber}
            setCurrentTabNumber={setCurrentTabNumber}
          />
        </TabPanel>
        <TabPanel>
          <Step2
            CurrentTabNumber={CurrentTabNumber}
            setCurrentTabNumber={setCurrentTabNumber}
          />
        </TabPanel>
        <TabPanel>
          <Step3 />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default AddReservation;
