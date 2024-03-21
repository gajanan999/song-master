import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { useLocation,useNavigate } from 'react-router-dom';
import { Dashboard, FolderCopy, LibraryMusic, PlaylistAdd, Settings } from "@mui/icons-material";

interface Props {
  drawerWidth: number;
  open: boolean;
  onClose: () => void;
  window?: () => Window;
}

export default function IceDrawer(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { drawerWidth, open, onClose, window } = props;

  const navigateTo = (route: string) => {
    if(route === '/my songs'){
        route = 'my-songs'
    }
    navigate(route);
    onClose(); 
  };

  const isActiveRoute = (route: string) => {
    if(location.pathname === '/my-songs' && route === 'My Songs'){
      return true
    }
    return location.pathname === `/${route.toLowerCase()}`;
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["Dashboard", "Songs", "My Songs","Playlists"].map((text, index) => (
          <ListItem key={text} 
          disablePadding 
          onClick={() => navigateTo(`/${text.toLowerCase()}`)}
          sx={{ backgroundColor: isActiveRoute(text) ? "#f0f0f0" : "inherit" }}>
            <ListItemButton>
              <ListItemIcon>
                {text === "Dashboard" && <Dashboard />}
                {text === "Songs" && <FolderCopy />}
                {text === "My Songs" && <LibraryMusic/>}
                {text === "Playlists" && <PlaylistAdd/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["settings"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              {text === "settings" && <Settings/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Drawer
        container={container}
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
}
