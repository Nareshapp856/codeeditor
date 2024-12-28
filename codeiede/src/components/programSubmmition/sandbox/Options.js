import RefreshIcon from "@mui/icons-material/Refresh";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import ThemeSelector from "./options/ThemeSelector";
import TechnologySelector from "./options/TechnologySelector";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Save from "./options/Save";
import FileSelector from "./options/FileSelector";
import { connect } from "react-redux";
import SubmitHandler from "./options/SubmitHandler";

const themes = ["vs-dark", "hc-light", "hc-black"];

function OptionsComponent({ theme, setTheme }) {
  const handleReset = () => {};

  const handleResetConfirmed = () => {};

  const handleResetCancelled = () => {};

  const onCodeEditorExpand = () => {};

  const onThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-600">
          Choose file:
        </label>
        <FileSelector />
      </div>

      <div className="flex space-x-4 items-center justify-between">
        <div>
          <SubmitHandler />
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-600">Theme:</label>
          <ThemeSelector
            themes={themes}
            onThemeChange={onThemeChange}
            theme={theme}
          />
        </div>

        <span>
          <Save />
        </span>

        <span
          onClick={onCodeEditorExpand}
          className="cursor-pointer text-gray-500 hover:text-gray-800"
        >
          <OpenWithIcon />
        </span>

        <span
          onClick={handleReset}
          className="cursor-pointer text-gray-500 hover:text-gray-800"
        >
          <RefreshIcon />
        </span>
      </div>

      <Dialog
        onClose={handleResetCancelled}
        aria-labelledby="reset-confirmation-modal"
      >
        <DialogTitle id="reset-confirmation-modal">Confirm Reset</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reset the editor? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleResetCancelled}
            color="secondary"
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleResetConfirmed} autoFocus>
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const Options = connect(null, null)(OptionsComponent);

export default Options;
