import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/Logout";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import '../admin.scss'
import PopupAdmin from '../components/popup'


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [notify, setNotify] = useState(false);
  const [setting, setSetting] = useState(false);
  const [btnPopup, setBtnPopup] = useState(false)
  const logout=()=>{
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('isAdmin');
    localStorage.removeItem('token');

    window.location.href = '/login';
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
      </Box>

      {/* ICONS */}
      <Box display="flex">
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}
        {/* <IconButton>
          <NotificationsOutlinedIcon onClick={() => setNotify((view) => !view)} />
          {notify &&
            <div className='admin-notify-page'>
              <div className='admin-notify-hover' onClick={() => setBtnPopup(true)}>
                <div className='admin-notify-item'>
                  <div className='admin-notify-user-avt'>
                    <img src='https://i.pinimg.com/originals/82/d4/92/82d4926dcf09dd4c73eb1a6c0300c135.jpg' />
                  </div>
                  <div className='admin-notify-user'>
                    <div className='admin-notify-user-name'>Phúc Đào</div>
                    <div className='admin-notify-user-content'>Duyệt bài lẹ không sập web</div>
                    <div className='admin-notify-user-time'><i class="fa-regular fa-clock"></i> 49 phút trước</div>
                  </div>
                </div>
              </div>

              <div className='admin-notify-hover' onClick={() => setBtnPopup(true)}>
                <div className='admin-notify-item'>
                  <div className='admin-notify-user-avt'>
                    <img src='https://i.pinimg.com/originals/82/d4/92/82d4926dcf09dd4c73eb1a6c0300c135.jpg' />
                  </div>
                  <div className='admin-notify-user'>
                    <div className='admin-notify-user-name'>Phúc Đào</div>
                    <div className='admin-notify-user-content'>Duyệt bài lẹ không sập web</div>
                    <div className='admin-notify-user-time'><i class="fa-regular fa-clock"></i> 49 phút trước</div>
                  </div>
                </div>
              </div>

              <div className='admin-notify-hover' onClick={() => setBtnPopup(true)}>
                <div className='admin-notify-item'>
                  <div className='admin-notify-user-avt'>
                    <img src='https://i.pinimg.com/originals/82/d4/92/82d4926dcf09dd4c73eb1a6c0300c135.jpg' />
                  </div>
                  <div className='admin-notify-user'>
                    <div className='admin-notify-user-name'>Phúc Đào</div>
                    <div className='admin-notify-user-content'>Duyệt bài lẹ không sập web</div>
                    <div className='admin-notify-user-time'><i class="fa-regular fa-clock"></i> 49 phút trước</div>
                  </div>
                </div>
              </div>

              <div className='admin-notify-hover' onClick={() => setBtnPopup(true)}>
                <div className='admin-notify-item'>
                  <div className='admin-notify-user-avt'>
                    <img src='https://i.pinimg.com/originals/82/d4/92/82d4926dcf09dd4c73eb1a6c0300c135.jpg' />
                  </div>
                  <div className='admin-notify-user'>
                    <div className='admin-notify-user-name'>Phúc Đào</div>
                    <div className='admin-notify-user-content'>Duyệt bài lẹ không sập web</div>
                    <div className='admin-notify-user-time'><i class="fa-regular fa-clock"></i> 49 phút trước</div>
                  </div>
                </div>
              </div>

              <div className='admin-notify-hover' onClick={() => setBtnPopup(true)}>
                <div className='admin-notify-item'>
                  <div className='admin-notify-user-avt'>
                    <img src='https://i.pinimg.com/originals/82/d4/92/82d4926dcf09dd4c73eb1a6c0300c135.jpg' />
                  </div>
                  <div className='admin-notify-user'>
                    <div className='admin-notify-user-name'>Phúc Đào</div>
                    <div className='admin-notify-user-content'>Duyệt bài lẹ không sập web</div>
                    <div className='admin-notify-user-time'><i class="fa-regular fa-clock"></i> 49 phút trước</div>
                  </div>
                </div>
              </div>

              <div className='admin-notify-hover' onClick={() => setBtnPopup(true)}>
                <div className='admin-notify-item'>
                  <div className='admin-notify-user-avt'>
                    <img src='https://i.pinimg.com/originals/82/d4/92/82d4926dcf09dd4c73eb1a6c0300c135.jpg' />
                  </div>
                  <div className='admin-notify-user'>
                    <div className='admin-notify-user-name'>Phúc Đào</div>
                    <div className='admin-notify-user-content'>Duyệt bài lẹ không sập web</div>
                    <div className='admin-notify-user-time'><i class="fa-regular fa-clock"></i> 49 phút trước</div>
                  </div>
                </div>
              </div>
            </div>
          }
          <PopupAdmin trigger={btnPopup} setTrigger={setBtnPopup}>
            <div className='admin-notify-top'>Chi tiết thông báo</div>
            <div className='admin-notify-item'>
              <div className='admin-notify-detail-user-avt'>
                <img src='https://i.pinimg.com/originals/82/d4/92/82d4926dcf09dd4c73eb1a6c0300c135.jpg' />
              </div>
              <div className='admin-notify-detail-user'>
                <div className='admin-notify-user-name'>Phúc Đào</div>
                <div className='admin-notify-user-time'><i class="fa-regular fa-clock"></i> 49 phút trước</div>
                <div className='admin-notify-user-content'>Duyệt bài lẹ không sập web</div>
              </div>
            </div>
          </PopupAdmin>
        </IconButton> */}
        <IconButton>

          <SettingsOutlinedIcon onClick={() => setSetting((view) => !view)}/>
          {setting &&
            <div onClick={logout()}></div>
          }
        </IconButton>
        {/* <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}
      </Box>
    </Box>
  );
};

export default Topbar;
