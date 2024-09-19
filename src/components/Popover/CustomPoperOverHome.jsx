import { Popover, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const CustomPoperOverHome = ({
  popover_open,
  popover_id,
  handleClose,
  popover_anchorEl,
  setContent,
  CurrentStatus,
}) => {
  const [t, i18n] = useTranslation("global");

  const StationsData = useSelector((state) => state.StationReducer);

  const Content = [
    {
      Text: "Healthy",
      FilterText: "Healthy",
      Color: "bg-[#2EB100]",
      BorderColor: "border-[#2EB100]",
    },
    {
      Text: "Be Ready",
      FilterText: "BeReady",
      Color: "bg-[#6877DC]",
      BorderColor: "border-[#6877DC]",
    },
    {
      Text: "Make an Order",
      FilterText: "MakeOrder",
      Color: "bg-[#C93D33]",
      BorderColor: "border-[#C93D33]",
    },
  ];
  return (
    <Popover
      id={popover_id}
      open={popover_open}
      anchorEl={popover_anchorEl}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: "25px", // Add rounded corners
          backgroundColor: "white", // Set background color to white
          width: "400px", // Set the width as needed
          overflow: "hidden", // Hide overflowing content
        },
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Typography
        sx={{
          p: 5,
          borderColor: "#465462",
          backgroundColor: "#465462",
          width: "400px",
          overflow: "hidden",
          borderRadius: "25px",
        }}
      >
        <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px] overflow-hidden">
          <p className="h-[2px] w-[54px] bg-[#90898E]"></p>
          <p className="h-[2px] w-full bg-[#FFFFFF5C] mt-7 mb-3 rounded-full"></p>

          <div className="font-[Quicksand] font-[700] text-[1.8rem] mb-6">
            {t(`ChooseYourFilter`)}
          </div>

          <div className="w-[260px] flex flex-col justify-between">
            {Content.map((content_data) => {
              return (
                <div className="flex my-2 justify-between">
                  <div
                    className={`rounded-[16px] ${content_data.Color} px-4 py-2 w-[194px] font-[600] text-[1.2rem] text-center text-white font-[Quicksand] flex justify-center items-center cursor-pointer`}
                    onClick={() => {
                      handleClose();
                      setContent(content_data.FilterText);
                    }}
                  >
                    {content_data.Text === "Healthy"
                      ? t(`status.Healthy`)
                      : content_data.Text === "Be Ready"
                      ? t(`status.BeReady`)
                      : content_data.Text === "Make an Order"
                      ? t(`status.MakeOrder`)
                      : content_data.Text}
                  </div>
                  <div
                    className={`h-full border-2 ${
                      content_data.FilterText === CurrentStatus
                        ? "border-white"
                        : content_data.BorderColor
                    } ${
                      content_data.FilterText === CurrentStatus
                        ? content_data.Color
                        : ""
                    } px-1 py-2 text-[20px] font-[600] rounded-[10px] w-[60px] flex justify-center items-center`}
                  >
                    {
                      StationsData?.data?.filter(
                        (sd) => sd.current_status === content_data.FilterText
                      ).length
                    }
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="mt-2 border-b-[#465462] border-b-[1px] hover:border-b-[#fff] transition-all duration-500 ease-in-out cursor-pointer"
            onClick={() => {
              setContent("");
              handleClose();
            }}
          >
            {t("ClearFilter")}
          </div>
        </div>
      </Typography>
    </Popover>
  );
};

export default CustomPoperOverHome;
