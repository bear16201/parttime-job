import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/topbar";
import Sidebar from "./scenes/sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import BlackList from "./scenes/blackList";
import "./admin.scss";


export default function AdminBlackList() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="adminDashboard">
          <div className="adminDashboard-sidebar">
            <Sidebar isSidebar={isSidebar} />
          </div>
          <div className="adminManageUser-content">
            <main className="" style={{ translate: 270 }}>
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<BlackList />} />
              </Routes>
            </main>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
