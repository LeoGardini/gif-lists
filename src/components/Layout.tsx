import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <CssBaseline />
      <Box display="flex" p={10}>
        <Grid container alignContent="center" justifyContent="center">
          <Grid item xs={12}>
            <Box>
              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Layout;
