import React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";

export default function SettingsCascader({ setSelectedTheme }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (theme) => {
    setSelectedTheme(theme);
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box>
        <Tooltip title="Editor settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "editor-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="editor-menu"
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* Theme group */}
        <Typography variant="subtitle1" sx={{ pl: 2, pr: 2, pt: 1 }}>
          Monaco Editor Theme
        </Typography>
        <MenuItem onClick={() => handleClose("vs-dark")}>
          <ListItemIcon>
            <Brightness4Icon />
          </ListItemIcon>
          Dark Theme
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleClose("hc-black")}>
          <ListItemIcon>
            <LightbulbIcon />
          </ListItemIcon>
          High Contrast Dark
        </MenuItem>
        <MenuItem onClick={() => handleClose("high-contrasthc-light")}>
          <ListItemIcon>
            <WbIncandescentIcon />
          </ListItemIcon>
          High Contrast Light
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
