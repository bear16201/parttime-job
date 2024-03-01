import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  useEffect(() => {
    const navigateIfNotLoggedIn = () => {
      if (!sessionStorage.getItem("isAdmin")) {
        navigate("/");
      }
    };

    // Kiểm tra và chuyển hướng khi component được render lần đầu
    navigateIfNotLoggedIn();

    // Nếu emid thay đổi trong quá trình render, kiểm tra và chuyển hướng lại
    return () => {
      navigateIfNotLoggedIn();
    };
  }, [navigate]);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box style={{ height: '750px', position: 'fixed' }}
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography fontFamily={'Open Sans'} marginBottom={"30px"}  variant="h3" color={colors.grey[100]}>
                ADMIN
              </Typography>
            </Box>

          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* <Item
              title="Dashboard"
              to="/adminDashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Quản lý
            </Typography> */}
            <Item
              title="Quản lý người dùng"
              to="/adminManageUser"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              style={{ fontFamily: 'Open Sans' }}
            />
            <Item
              title="Duyệt bài đăng"
              to="/adminApprovePost"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              style={{ fontFamily: 'Open Sans' }}
            />
            <Item
              title="Danh sách đen"
              to="/adminBlacklist"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              style={{ fontFamily: 'Open Sans' }}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Hỗ trợ
            </Typography>
            <Item
              title="Hỗ trợ"
              to="/adminContact"
              icon={<ContactSupportOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              style={{ fontFamily: 'Open Sans' }}
            />
            {/* <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
