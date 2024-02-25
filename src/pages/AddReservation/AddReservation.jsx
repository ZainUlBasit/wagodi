import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./Style.css";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import OrderManagerNavbar from "../../components/Navbar/OrderManagerNavbar";
import { useLocation } from "react-router-dom";
import { OrderCreateApi } from "../../Https";
import ErrorToast from "../../components/Toast/ErrorToast";
// import "react-tabs/style/react-tabs.css";
const AddReservation = () => {
  const [CurrentTabNumber, setCurrentTabNumber] = useState(0);
  const location = useLocation();
  const { type, max_value, value, s_name, s_id, fuel_id, s_location } =
    location.state;
  console.log(location.state);
  const [FormData, setFormData] = useState({
    fuel_id: fuel_id,
  });
  const [FromStation, setFromStation] = useState({});
  const [ToStation, setToStation] = useState({});
  const [ProccessData, setProccessData] = useState(false);
  const SetFormData = (Data) => {
    setFormData({ ...FormData, [Data.key]: Data.value });
  };
  const ProccessingData = async (BodyData) => {
    console.log(BodyData);
    // return;
    try {
      const response = await OrderCreateApi(BodyData);
      console.log(response);
      if (response?.data?.success) {
        console.log(response);
        setCurrentTabNumber(CurrentTabNumber + 1);
      } else {
        ErrorToast(response?.data?.error?.msg);
      }
    } catch (err) {
      console.log(err);
      console.log(err?.data?.error?.msg);
    }
  };

  return (
    <>
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
            s_id={s_id}
            s_name={s_name}
            s_location={s_location}
            type={type}
            CurrentTabNumber={CurrentTabNumber}
            setCurrentTabNumber={setCurrentTabNumber}
            setFromStation={setFromStation}
            setToStation={setToStation}
            setFormData={setFormData}
            FormData={FormData}
          />
        </TabPanel>
        <TabPanel>
          <Step2
            CurrentTabNumber={CurrentTabNumber}
            setCurrentTabNumber={setCurrentTabNumber}
            state={location.state}
            SetFormData={SetFormData}
            ProccessingData={ProccessingData}
            FormData={FormData}
          />
        </TabPanel>
        <TabPanel>
          <Step3 formData />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default AddReservation;
