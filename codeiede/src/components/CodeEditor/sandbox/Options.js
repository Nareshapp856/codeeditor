import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import TechnologySelector from "./options/TechnologySelector";
import Timer from "./options/Timer";
import SettingsCascader from "./options/SettingsCascader";
import SubmitTest from "./options/SubmitTest";
import Save from "./options/Save";

function Options({
  programmingLanguages,
  selectedLanguage,
  setSelectedLanguage,
  setSelectedTheme,
  onReset,
  setCodeEditorExtend,
  testCasesOutput,
}) {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleReset = () => {
    setOpenConfirmationModal(true);
  };

  const handleResetConfirmed = () => {
    onReset();
    setOpenConfirmationModal(false);
  };

  const handleResetCancelled = () => {
    setOpenConfirmationModal(false);
  };

  const onCodeEditorExpand = () => {
    setCodeEditorExtend(true);
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        spacing={0}
        flexGrow={1}
        sm={6}
        md={5.4}
        lg={6}
        sx={{
          justifyContent: isSmallScreen ? "space-between" : "",
          marginInline: isSmallScreen ? "1rem" : "",
        }}
      >
        <Grid item display="flex" alignItems="center">
          <Typography variant="body4" marginInlineEnd={0.6}>
            Language:
          </Typography>
          <TechnologySelector
            programmingLanguages={programmingLanguages}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        </Grid>
      </Grid>

      <Grid
        sm={6}
        md={6}
        lg={6}
        display={"flex"}
        justifyContent={"space-between"}
        sx={
          isSmallScreen && {
            width: "100%",
            marginInline: isSmallScreen ? "1rem" : "",
          }
        }
      >
        <Grid
          display={"flex"}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Tooltip sx={{ marginInlineEnd: "-12px" }} title="Submit">
            <SubmitTest testCasesOutput={testCasesOutput} />
          </Tooltip>
        </Grid>
        <Grid
          display={"flex"}
          justifyContent={"space-between"}
          sx={isSmallScreen && { width: "50%" }}
        >
          <Tooltip title="Save">
            <IconButton>
              <Save />
            </IconButton>
          </Tooltip>
          <Tooltip title="Expand Editor">
            <IconButton onClick={onCodeEditorExpand}>
              <OpenWithIcon className="cursor-pointer text-gray-500" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset">
            <IconButton onClick={handleReset}>
              <RefreshIcon className="cursor-pointer text-gray-500" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <SettingsCascader setSelectedTheme={setSelectedTheme} />
          </Tooltip>
        </Grid>
      </Grid>

      <Dialog
        open={openConfirmationModal}
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

export default Options;
