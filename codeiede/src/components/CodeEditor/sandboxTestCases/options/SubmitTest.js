import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import { connect, useDispatch, useSelector } from "react-redux";
import { submitTest } from "../../../../redux/actions";
import { UserContext } from "../../../../context/UserContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { submitTestReset } from "../../../../redux/slices/codeEditorSlice";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import {
  resetMonacoSliceCodeItem,
  resetTimer,
  setShouldCount,
} from "../../../../redux/slices/examSlice";
import { persistor } from "../../../../redux";

function SubmitTestComponent({
  testCasesOutput,
  submitTestDispatch,
  isLoading,
  submitTestState,
  shouldCountDispatch,
  submitState,
  resetItemDispatch,
  resetPersistStore,
  userCode,
}) {
  const problemId = useParams().problemId;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { isError } = useSelector((store) => store.submitTest);

  const persistPurge = useCallback(async () => {
    await persistor.purge();
    resetPersistStore();
  }, [resetPersistStore]);

  useEffect(() => {
    if (submitTestState === "reslove" || isError) {
      setOpen(true);
      persistPurge();
    }
  }, [submitTestState, isError, persistPurge]);

  useEffect(() => {
    dispatch(submitTestReset());
  }, [dispatch]);

  const userName = user?.username || "";
  const userEmail = user?.email || "";
  const testCasesPassCount = Object.values(testCasesOutput).filter(
    (testCase) => testCase?.flag
  ).length;
  const testCasesFailCount = Object.values(testCasesOutput).filter(
    (testCase) => testCase && !testCase.flag
  ).length;

  const submitHanlder = () => {
    submitTestDispatch({
      data: Object.keys(testCasesOutput).map((index) => {
        return {
          Email: userEmail,
          ProgramId: problemId,
          TestCaseId: testCasesOutput[index].TestCaseId,
          Output: testCasesOutput[index].output,
          Result: testCasesOutput[index].flag ? 1 : 0,
        };
      }),
      Email: userEmail,
      StudentName: userName,
      ProgramId: problemId,
      No_TestCasesPassed: testCasesPassCount,
      No_TestCasesFailed: testCasesFailCount,
      UserCode: userCode,
    });
    shouldCountDispatch(false);
  };

  return (
    <>
      <Button
        className="text-green-400 cursor-pointer"
        color="success"
        disabled={isLoading}
        startIcon={
          submitTestState === "reslove" ? (
            <SentimentVerySatisfiedIcon />
          ) : isLoading ? (
            <CircularProgress size={20} sx={{ color: "GrayText" }} />
          ) : (
            <BackupIcon />
          )
        }
        onClick={submitHanlder}
      >
        {submitTestState === "reslove" ? "Done" : "Submit"}
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          navigate("/problemset");
          resetItemDispatch(problemId);
        }}
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
            <Typography
              variant="h5"
              id="modal-title"
              align="center"
              gutterBottom
            >
              {submitTestState === "reslove"
                ? "Submission Successful!"
                : "Submission Failed"}
            </Typography>
          </Typography>
          <Typography
            variant="body1"
            id="modal-description"
            align="center"
            paragraph
          >
            {submitTestState === "reslove"
              ? "Your test has been successfully submitted."
              : "Failed to submit your test. Please try again."}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              color={submitTestState === "reslove" ? "success" : "error"}
              onClick={() => {
                setOpen(false);
                if (isError) {
                  submitHanlder();
                } else {
                  navigate("/problemset");
                  resetItemDispatch(problemId);
                }
              }}
            >
              {submitTestState === "reslove" ? "View Problems" : "Retry"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

const mapState = (state) => ({
  isLoading: state.submitTest.isLoading,
  submitTestData: state.submitTest.data,
  submitTestState: state.submitTest.state,
  shouldTimerCount: state.timer.shouldCount,
  userCode: state.codeEditor.userCode,
});

const mapDispatch = {
  submitTestDispatch: submitTest,
  resetTimerDispatch: resetTimer,
  shouldCountDispatch: setShouldCount,
  resetItemDispatch: resetMonacoSliceCodeItem,
  resetPersistStore: () => ({
    type: "RESET_STATE",
  }),
};

const SubmitTest = connect(mapState, mapDispatch)(SubmitTestComponent);

export default SubmitTest;
