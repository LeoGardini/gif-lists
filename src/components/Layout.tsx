import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <CssBaseline />
      <Box display="flex">
        <Grid container alignContent="center" justifyContent="center">
          <Grid item xs={2} />

          <Grid item xs={8}>
            <Box>
              <Outlet />
            </Box>
          </Grid>

          <Grid item xs={2} />
        </Grid>
      </Box>
    </>
  );
}

export default Layout;
