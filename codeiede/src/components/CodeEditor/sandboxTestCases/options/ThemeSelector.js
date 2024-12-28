import React from "react";
import { Select, MenuItem } from "@mui/material";

function ThemeSelector({ themes, selectedTheme, setSelectedTheme }) {
  const handleChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  return (
    <Select
      labelId="theme-select-label"
      id="theme-select"
      value={selectedTheme}
      onChange={handleChange}
      label="Theme"
      size="small"
    >
      {themes.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}

export default ThemeSelector;
