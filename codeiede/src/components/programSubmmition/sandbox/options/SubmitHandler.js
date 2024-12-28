import BackupIcon from "@mui/icons-material/Backup";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";

import { p_submitCode } from "../../../../redux/actions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { resetProgramSubmmitionSlice } from "../../../../redux/slices/ProgramSubmmitionSlice";
import { programSubmmitionReset } from "../../../../redux/slices/programSubmmition/submitCodeSlice";
import { resetExecuteCodeSlice } from "../../../../redux/slices/programSubmmition/executeCodeSlice";
import EditIcon from "@mui/icons-material/Edit";
import SubmitModal from "./SubmitHandler/SubmitModal";

function SubmitHandlerComponent({
  submitCode,
  isSubmmiting,
  submitData,
  isSubmmitingError,
  submitState,
  submitStatus,
  files,
  testCases,
  formData,
  resetProgramSubmmitionSlice,
  submitCodeReset,
  resetExecuteCodeSliceDispatch,
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [submitModal, setSubmitModal] = useState(false);

  useEffect(() => {
    if (submitState === "resolve" || isSubmmitingError) {
      setOpen(true);
    }
  }, [submitState, isSubmmitingError]);

  const handleClose = () => {
    setOpen(false);
    submitCodeReset();
    resetExecuteCodeSliceDispatch();
  };

  const submitHanlder = () => {
    resetProgramSubmmitionSlice();
    submitCodeReset();
    resetExecuteCodeSliceDispatch();
  };

  const is400 = () => {
    return submitStatus > 399 && submitStatus < 500;
  };

  return (
    <>
      <Button
        disabled={isSubmmiting}
        className="text-green-400 cursor-pointer"
        color="success"
        startIcon={<BackupIcon />}
        onClick={() => {
          setSubmitModal(true);
          //   submitCode({
          //     files,
          //     testCases,
          //     ...formData,
          //     image: JSON.stringify(formData.image),
          //   })
        }}
      >
        Submit
      </Button>

      <SubmitModal
        setSubmitModal={setSubmitModal}
        submitModal={submitModal}
        formData={formData}
        testCases={testCases}
        files={files}
        submitCode={submitCode}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500, // Adjust width for better readability
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 5, // Add border radius for a softer look
          }}
        >
          <Typography variant="h5" id="modal-title" align="center" gutterBottom>
            {submitState === "resolve"
              ? "Submission Successful!"
              : "Submission Failed"}
          </Typography>
          <Typography
            variant="body1"
            id="modal-description"
            align="center"
            paragraph
          >
            {submitState === "resolve"
              ? "Your test has been successfully submitted."
              : "Failed to submit your test. Please try again."}
          </Typography>
          {
            <Grid container spacing={2} mt={2}>
              <Grid item display="flex" justifyContent="center" xs={6} md={6}>
                <Button
                  variant="outlined"
                  sx={{ marginInlineStart: "4rem" }}
                  color={submitState === "resolve" ? "success" : "secondary"}
                  startIcon={<EditIcon />}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  {submitState === "resolve" ? "View Problems" : "Edit"}
                </Button>
              </Grid>
              <Grid item display="flex" justifyContent="center" xs={6} md={6}>
                <Button
                  sx={{ marginInlineEnd: "4rem" }}
                  variant="contained"
                  color={submitState === "resolve" ? "success" : "error"}
                  onClick={() => {
                    setOpen(false);
                    if (!isSubmmitingError) {
                      navigate("/problemset");
                    } else {
                      submitCode({
                        files,
                        testCases,
                        ...formData,
                        image: JSON.stringify(formData.image),
                      });
                    }
                  }}
                >
                  {submitState === "resolve" ? "View Problems" : "Retry"}
                </Button>
              </Grid>
            </Grid>
          }
        </Box>
      </Modal>
    </>
  );
}

const mapState = (state) => ({
  isSubmmiting: state.prog_submitcode.isLoading,
  submitStatus: state.prog_submitcode.status,
  submitData: state.prog_submitcode.data,
  isSubmmitingError: state.prog_submitcode.isError,
  submitState: state.prog_submitcode.state,
  files: state.programSubmmition.files,
  testCases: state.programSubmmition.testCases,
  formData: state.programSubmmition.formData,
});

const mapDispatch = {
  submitCode: p_submitCode,
  resetProgramSubmmitionSlice: resetProgramSubmmitionSlice,
  submitCodeReset: programSubmmitionReset,
  resetExecuteCodeSliceDispatch: resetExecuteCodeSlice,
};

const SubmitHandler = connect(mapState, mapDispatch)(SubmitHandlerComponent);

export default SubmitHandler;
