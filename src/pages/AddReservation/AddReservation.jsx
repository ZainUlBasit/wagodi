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
import { useFormik } from "formik";
import { useSelector } from "react-redux";
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
  const CurrentUser = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      to_name: s_name,
      res_date: new Date().toISOString().split("T")[0],
      paid_amount: "",
      arrival_date: "",
      tip: "",
      fuel_id: "",
      orderManagerId: "",
      station_id: "",
      station_address: "",
      station_name: "",
      companyId: "",
      fuel_type: type,
      fuel_value: "",
      fuel_price: "",
      from_option: "",
      stationId: "",
      vendorId: "",
      from_address: "",
      from_name: "",
      reciept_number: "",
      cur_value: value,
      file: "",
    },
    onSubmit: async (values) => {
      if (values.fuel_value !== "" && values.file !== "") {
        const BodyData =
          values.from_option === 0
            ? // for vendors
              {
                // reciever
                stations: [
                  {
                    id: values.stationId,
                    address: "xyz street",
                    name: values.to_name,
                  },
                ],
                orderManagerId: CurrentUser.data._id,
                companyId: CurrentUser.data.companyId._id,
                fuel_type: values.fuel_type,
                fuel_value: values.fuel_value,
                fuel_price: values.paid_amount,
                fuel_id: values.fuel_id,
                // "location": "",
                // sender
                from: {
                  option: values.from_option,
                  vendorId: values.vendorId,
                  address: values.from_address,
                },
                reciept_number: values.reciept_number,
                attachment: values.file ? values.file : "",
              }
            : // for stations
              {
                // reciever
                stations: [
                  {
                    id: values.stationId,
                    address: "xyz street",
                    name: values.to_name,
                  },
                ],
                orderManagerId: CurrentUser.data._id,
                companyId: CurrentUser.data.companyId._id,
                fuel_type: values.fuel_type,
                fuel_value: values.fuel_value,
                fuel_price: values.paid_amount,
                fuel_id: values.fuel_id,
                // "location": "",
                // sender
                from: {
                  option: values.from_option,
                  stationId: values.stationId,
                  address: values.from_address,
                },
                reciept_number: values.reciept_number,
                attachment: values.file ? values.file : "",
              };
        try {
          const response = await OrderCreateApi(BodyData);
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
      } else {
        ErrorToast("Required Fields is Undefined!");
      }
    },
  });

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
            onClick={() => {
              if (CurrentTabNumber !== 2) setCurrentTabNumber(0);
            }}
          >
            1
          </Tab>
          <Tab
            className={`Tab ${
              CurrentTabNumber === 1 || CurrentTabNumber === 2
                ? "bg-[#465462]"
                : "bg-[#96ADC5]"
            } text-[white] w-10 h-10 flex justify-center items-center relative z-[1] rounded-[50%] outline-none font-[Quicksand] select-none`}
            onClick={() => {
              if (
                formik.values.name !== "" &&
                formik.values.res_date !== "" &&
                formik.values.reciept_number !== "" &&
                formik.values.paid_amount !== "" &&
                formik.values.arrival_date !== "" &&
                formik.values.from_option !== ""
              ) {
                if (
                  (formik.values.stationId === "" &&
                    formik.values.from_option === 1) ||
                  (formik.values.vendorId === "" &&
                    formik.values.from_option === 0)
                ) {
                  ErrorToast("Required Fields is Undefined!");
                } else {
                  if (CurrentTabNumber !== 2) setCurrentTabNumber(1);
                }
              } else ErrorToast("Required Fields is Undefined!");
            }}
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
            formik={formik}
            CurrentTabNumber={CurrentTabNumber}
            setCurrentTabNumber={setCurrentTabNumber}
          />
        </TabPanel>
        <TabPanel>
          <Step2
            formik={formik}
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
