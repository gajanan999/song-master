import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Toolbar, useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import LogoutOutlined from "@mui/icons-material/LoginOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import IceDrawer from "../../components/ice-drawer";
import { useDispatch } from 'react-redux';
import { useAppContext } from '../../App';
import { logoutUser } from '../../store/reducers/user';

// ==============================|| MAIN LAYOUT ||============================== //

const drawerWidth = 240;
const MainLayout = () => {

  const dispatch = useDispatch();
  const { setAuthorization } = useAppContext();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser({}));
    setAuthorization(false)
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Song Master
          </Typography>
          <IconButton
            size="medium"
            sx={{ textAlign: "right", color: "white" }}
            onClick={handleLogout}
          >
            Logout <LogoutOutlined />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <IceDrawer
          drawerWidth={drawerWidth}
          open={mobileOpen}
          onClose={handleDrawerClose}
        />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
