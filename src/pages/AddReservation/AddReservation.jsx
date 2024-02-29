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
import axios from "axios";
import { BASE_URL } from "../../assets/config";
import InactiveLine from "../../assets/images/inactiveline.png";
// import "react-tabs/style/react-tabs.css";
const AddReservation = () => {
  const [CurrentTabNumber, setCurrentTabNumber] = useState(0);
  const location = useLocation();
  const {
    type,
    max_value,
    value,
    s_name,
    s_id,
    fuel_id,
    s_location,
    s_long,
    s_lat,
  } = location.state;
  console.log(location.state);
  // const [FormData, setFormData] = useState({
  //   fuel_id: fuel_id,
  // });
  const [FromStation, setFromStation] = useState({});
  const [ToStation, setToStation] = useState({});
  const [ProccessData, setProccessData] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  // const SetFormData = (Data) => {
  //   setFormData({ ...FormData, [Data.key]: Data.value });
  // };
  const CurrentUser = useSelector((state) => state.auth);

  function convertFileToObject(file) {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified, // You can include other properties if needed
    };
  }

  const formik = useFormik({
    initialValues: {
      to_name: s_name,
      res_date: new Date().toISOString().split("T")[0],
      paid_amount: "",
      arrival_date: "",
      tip: "",
      fuel_id: fuel_id,
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
      attachment: "",
      vendor_price: 0,
      from_long: "",
      from_lat: "",
    },
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("orderManagerId", CurrentUser.data._id);
      formData.append("companyId", CurrentUser.data.companyId._id);
      formData.append("fuel_type", values.fuel_type);
      formData.append("fuel_value", values.fuel_value);
      formData.append("fuel_id", values.fuel_id);
      formData.append("reciept_number", values.reciept_number);
      // Append 'from' object fields to the FormData object
      formData.append("from[option]", values.from_option);
      formData.append("from[address]", values.from_address);
      if (values.from_option === 0) {
        formData.append("from[vendorId]", values.vendorId);
        formData.append("fuel_price", values.vendor_price * values.fuel_value);
        formData.append("from[longitude]", values.from_long);
        formData.append("from[latitude]", values.from_lat);
      } else if (values.from_option === 0) {
        formData.append("from[stationId]", values.stationId);
        formData.append("fuel_price", values.paid_amount);
      }
      // to stations
      formData.append(`stations[${0}][id]`, s_id);
      formData.append(`stations[${0}][address]`, s_location);
      formData.append(`stations[${0}][name]`, s_name);
      formData.append(`stations[${0}][latitude]`, s_lat);
      formData.append(`stations[${0}][longitude]`, s_long);
      formData.append(`attachment`, values.attachment);

      if (
        values.fuel_value !== "" &&
        values.attachment !== "" &&
        values.name !== "" &&
        values.res_date !== "" &&
        values.reciept_number !== "" &&
        values.arrival_date !== "" &&
        values.from_option !== ""
      ) {
        if (values.from_option !== 0 && values.paid_amount === "") {
          ErrorToast("Required Fields is Undefined!");
          return;
        }
        try {
          const response = await OrderCreateApi(formData);
          if (response?.data?.success) {
            console.log("response", response);
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
    console.log("BodyData", BodyData);
    // return;
    try {
      const response = await OrderCreateApi(BodyData);
      console.log("response", response);
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
        <TabList className="flex w-auto justify-between items-center">
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
          <img
            src={InactiveLine}
            className="h-[2px] overflow-hidden"
            alt="testing"
          />
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
          <img
            src={InactiveLine}
            className="h-[2px] overflow-hidden"
            alt="testing"
          />

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
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
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
            // SetFormData={SetFormData}
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
