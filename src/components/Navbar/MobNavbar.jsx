import React, { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { RiNotification3Fill, RiSettings2Fill } from "react-icons/ri"; // Import eye icons from react-icons
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { MobNavData } from "./MobNavData";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Typography } from "@mui/material";
import Logo from "../../assets/images/logoWhite.png";
import { useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";

const MobNavbar = () => {
  const [showNotificationDot, setShowNotificationDot] = useState(true);

  const handleNotificationClick = () => {
    setShowNotificationDot(false);
  };

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="bg-[#465462]"
    >
      <div className="w-full flex justify-center pt-5 m-0">
        <img src={Logo} alt="Images" className="w-[150px]" />
      </div>
      <List
        sx={{
          display: "flex",
          justifyContent: "between",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>
          {MobNavData.map((text, index) => (
            <>
              <ListItem
                className="w-full flex justify-between py-1"
                key={text.title}
                disablePadding
                onClick={() => {
                  navigate(text.link);
                }}
              >
                <ListItemButton className="w-full flex">
                  <Typography
                    //   variant="body1"
                    className="text-white w-full"
                    sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
                  >
                    {text.title}
                  </Typography>
                  <ListItemIcon className="flex justify-end">
                    <KeyboardArrowRightIcon className="text-white" />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Typography
                //   variant="div"
                component="div"
                className="text-white w-[90%] h-[2px] bg-[#FFFFFFB2]"
                sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
              ></Typography>
            </>
          ))}
        </div>
        <div className="flex flex-col w-[90%]">
          <ListItem
            className="w-full flex justify-between py-1"
            key={"logout"}
            disablePadding
            onClick={() => {}}
          >
            <ListItemButton className="w-full flex bg-yellow-300">
              <Typography
                //   variant="body1"
                className="text-white w-full"
                sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
              >
                Logout
              </Typography>
              <ListItemIcon className="flex justify-end">
                <TbLogout className="text-white text-[1.3rem]" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Typography
            //   variant="div"
            component="div"
            className="text-white w-[90%] h-[2px] bg-[#FFFFFFB2]"
            sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
          ></Typography>
        </div>
      </List>
    </Box>
  );

  return (
    <div className="w-full justify-center items-center hidden max767:flex pt-4">
      <div className="flex justify-between items-center w-[90%] rounded-[30px] bg-[#465462] text-white px-5 py-3 font-[Quicksand]">
        <div className="text-[1.7rem]">
          <BiMenuAltLeft
            onClick={toggleDrawer("menu", true)}
            className="cursor-pointer"
          />
          <Drawer
            anchor={"left"}
            open={state["menu"]}
            onClose={toggleDrawer("menu", false)}
          >
            {list("left")}
          </Drawer>
        </div>
        <div className="font-bold text-[1.2rem]">Home</div>
        <div className="relative">
          {showNotificationDot && (
            <div className="h-[9px] w-[9px] bg-[#FF4423] rounded-full absolute top-[2px] left-[24px]"></div>
          )}
          <div
            className={`cursor-pointer py-[6px] px-[6px] border-2 rounded-full ${
              true ? "border-[#475562]" : "border-[#fff]"
            }`}
            onClick={() => {
              handleNotificationClick();
              navigate("/notification");
            }}
          >
            <RiNotification3Fill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobNavbar;
