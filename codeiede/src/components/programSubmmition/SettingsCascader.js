import React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ResetTvIcon from "@mui/icons-material/ResetTv";

export default function SettingsCascader({ setWidth, setHeight }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setWidth(window.innerWidth * 0.6);
    setHeight(window.innerHeight * 0.6);
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ResetTvIcon />
          </ListItemIcon>
          <Tooltip title="resetting screen size doesn't effect the state of page">
            Reset Screen Size
          </Tooltip>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
