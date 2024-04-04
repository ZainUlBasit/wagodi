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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../assets/config";
import InactiveLine from "../../assets/images/inactiveline.png";
import WarningToast from "../../components/Toast/WarningToast";
import { fetchDrivers } from "../../store/Slices/DriverSlice";
// import "react-tabs/style/react-tabs.css";
const AddReservation = () => {
  const [CurrentTabNumber, setCurrentTabNumber] = useState(0);
  const location = useLocation();
  const { type, name } = location.state;
  console.log(location.state);
  // const [FormData, setFormData] = useState({
  //   fuel_id: fuel_id,
  // });
  const [FromStation, setFromStation] = useState({});
  const [ToStation, setToStation] = useState({});
  const [ProccessData, setProccessData] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const [Loading, setLoading] = useState(false);

  // const SetFormData = (Data) => {
  //   setFormData({ ...FormData, [Data.key]: Data.value });
  // };
  const CurrentUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
      to_name: name,
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
      cur_value: "",
      attachment: "",
      vendor_price: 0,
      from_long: "",
      from_lat: "",
      from_fuel_id: "",
      driver_name: "",
      driver_id: "",
      stations: [],
    },
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      console.log(values.vendor_price);
      console.log(values.fuel_value * values.vendor_price);
      formData.append("orderManagerId", CurrentUser.data._id);
      formData.append("companyId", CurrentUser.data.companyId._id);
      formData.append("fuel_type", values.fuel_type);
      formData.append("fuel_value", values.fuel_value);
      formData.append("requiredVolume", values.fuel_value);

      formData.append("receivedVolume", 0);
      if (values.driver_id !== "")
        formData.append("driverId", values.driver_id);
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
        formData.append("from[fuelId]", values.from_fuel_id);
      } else if (values.from_option === 1) {
        formData.append("from[stationId]", values.stationId);
        formData.append("fuel_price", values.paid_amount);
        formData.append("from[fuelId]", values.fuel_id);
      }
      formData.append("from[fuel_value]", values.fuel_value);
      // to stations
      //
      // console.log(f);

      let fuelQuantity = 0; // Initialize fuel quantity sum

      values.stations.forEach((station, index) => {
        formData.append(`stations[${index}][id]`, station._id);
        formData.append(`stations[${index}][address]`, station.address);
        formData.append(`stations[${index}][name]`, station.name);
        formData.append(`stations[${index}][latitude]`, station.latitude);
        formData.append(`stations[${index}][longitude]`, station.longitude);
        formData.append(`stations[${index}][fuelId]`, station.fuel_id);
        formData.append(`stations[${index}][value]`, station.current_value);

        // Calculate paid amount based on from_option
        const paidAmount =
          values.from_option === 0
            ? parseFloat(station.required_volume) *
              parseFloat(values.vendor_price)
            : parseFloat(station.required_volume) *
              parseFloat(station.current_price);
        formData.append(`stations[${index}][paid_amount]`, paidAmount);

        formData.append(
          `stations[${index}][required_volume]`,
          station.required_volume
        );

        // Add station's required volume to fuel quantity sum
        fuelQuantity += parseFloat(station.required_volume);
      });

      // Set fuel quantity in formData
      formData.append("fuel_quantity", fuelQuantity);
      // formData.append(
      //   `from[paid_amount]`,
      //   values.from_option === 0
      //     ? values.fuel_value * values.vendor_price
      //     : values.paid_amount
      // );
      // const currentPaidAmount = values.fuel_value * values.vendor_price;
      // console.log(values.vendor_price);
      // console.log(currentPaidAmount);
      // formData.append(`stations[${0}][paid_amount]`, currentPaidAmount);

      formData.append(`attachment`, values.attachment);
      formData.append(
        `expected_arrival`,
        Math.floor(new Date(values.arrival_date) / 1000)
      );
      formData.append(`driverTip`, values.tip !== "" ? values.tip : 0);

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // return;

      if (values.stations.length === 0) {
        setLoading(false);
        WarningToast("Please select atleast destination station!");
        // WarningToast("Required Volume must be under Station Capacity!");
      } else if (
        // values.fuel_value !== "" &&
        values.attachment !== "" &&
        values.name !== "" &&
        values.res_date !== "" &&
        values.reciept_number !== "" &&
        values.arrival_date !== "" &&
        values.from_option !== ""
      ) {
        // console.log(values.from_option, values.paid_amount);
        // if (values.from_option !== 0) {
        //   ErrorToast("Required Fields is Undefined!");
        //   setLoading(false);
        //   return;
        // }
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
      setLoading(false);
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

  const Auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDrivers(Auth.data.companyId));
  }, []);

  return (
    <>
      <Tabs
        className="flex justify-center flex-col items-center"
        //   onSelect={handleTabChange} // Call handleTabChange when a tab is selected
        selectedIndex={CurrentTabNumber} // Set the selected tab index
      >
        <TabList className="flex w-auto justify-between items-center py-5">
          <Tab
            className={`Tab ${
              CurrentTabNumber === 0 ||
              CurrentTabNumber === 1 ||
              CurrentTabNumber === 2
                ? "bg-[#465462]"
                : "bg-[#96ADC5]"
            } text-[white] min-w-10 min-h-10 flex justify-center items-center relative z-[1] rounded-[50%] outline-none font-[Quicksand] select-none`}
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
            } text-[white] min-w-10 min-h-10 flex justify-center items-center relative z-[1] rounded-[50%] outline-none font-[Quicksand] select-none`}
            onClick={() => {
              if (
                formik.values.name !== "" &&
                formik.values.res_date !== "" &&
                formik.values.reciept_number !== "" &&
                formik.values.arrival_date !== "" &&
                formik.values.attachment !== "" &&
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
            } text-[white] min-w-10 min-h-10 flex justify-center items-center relative z-[1] rounded-[50%] outline-none font-[Quicksand] select-none`}
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
            Loading={Loading}
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
