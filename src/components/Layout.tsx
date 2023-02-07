import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <CssBaseline />
      <Box display="flex" p={10}>
        <Box>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default Layout;
