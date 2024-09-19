import { Popover, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const CustomPoperOverWithShow = ({
  Title,
  Content,
  Filter,
  setFilter,
  ApplyFilter,
  setApplyFilter,
  popover_open,
  popover_id,
  handleClose,
  popover_anchorEl,
}) => {
  const [t, i18n] = useTranslation("global");

  return (
    <Popover
      id={popover_id}
      open={popover_open}
      anchorEl={popover_anchorEl}
      onClose={() => {
        setFilter(ApplyFilter);
        handleClose();
      }}
      PaperProps={{
        sx: {
          borderRadius: "25px", // Add rounded corners
          backgroundColor: "white", // Set background color to white
          width: "400px", // Set the width as needed
          overflow: "hidden", // Hide overflowing content
          marginTop: "6px",
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
        <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
          <div className="font-[Quicksand] font-[700] text-[1.5rem] mb-3">
            {Title}
          </div>
          <p className="h-[2px] w-full bg-[#FFFFFF5C] mb-3 rounded-full"></p>
          <div className="w-full flex flex-col justify-between gap-y-3 items-start">
            {Content.map((content_data) => {
              return (
                <div
                  className="flex gap-x-3 items-center cursor-pointer"
                  onClick={() => setFilter(content_data.FilterText)}
                >
                  <input
                    type="checkbox"
                    className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                    checked={Filter === content_data.FilterText}
                  />
                  <span>{t(`orderstatus.${content_data.Text}`)}</span>
                </div>
              );
            })}
          </div>
          <button
            className={`mt-[20px] w-[197px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
            onClick={() => {
              handleClose();
              setApplyFilter(Filter);
            }}
          >
            Show
          </button>
        </div>
      </Typography>
    </Popover>
  );
};

export default CustomPoperOverWithShow;
