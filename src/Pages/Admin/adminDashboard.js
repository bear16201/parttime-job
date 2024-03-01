import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/topbar";
import Sidebar from "./scenes/sidebar";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import "./admin.scss";


export default function AdminDashboard() {
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
          <div className="adminDashboard-content">
            <main className="adminDashboard-content-item" style={{ translate: 270 }}>
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
