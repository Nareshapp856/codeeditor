import React, { useState, useEffect, useContext, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { submitCode, submitCsharpCode } from "../../../../redux/actions";
import { Button, Typography, Modal, TextField } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { UserContext } from "../../../../context/UserContext";
import { submitTestReset } from "../../../../redux/slices/codeEditorSlice";
import { resetRunCount } from "../../../../redux/slices/examSliceTimer";

function SubmitHandlerComponent({
  userCode,
  toggleInput,
  userInput,
  executeTestcases,
  retrievedDetails,
  language,
  submitCodeDispatch,
  submitCsharpCodeDispatch,
  setTestCasesOutput,
}) {
  const { user } = useContext(UserContext);
  const userName = user?.username;
  const dispatch = useDispatch();

  const initialRandomTime = localStorage.getItem("randomTime")
    ? parseInt(localStorage.getItem("randomTime"), 10)
    : Math.floor(Math.random() * (7 * 60 - 3 * 60 + 1)) + 3 * 60;

  const initialElapsedTime = localStorage.getItem("elapsedTime")
    ? parseInt(localStorage.getItem("elapsedTime"), 10)
    : 0;

  const initialExecuteAttempts = localStorage.getItem("executeAttempts")
    ? parseInt(localStorage.getItem("executeAttempts"), 10)
    : 0;

  const randomTimeRef = useRef(initialRandomTime);
  const [elapsedTime, setElapsedTime] = useState(initialElapsedTime);
  const [isRunning, setIsRunning] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [istestExecute,setIsTestExecute]=useState(false);
  const [newTime, setNewTime] = useState("");
  const [reason, setReason] = useState("");
  const [openChangeTimeModal, setOpenChangeTimeModal] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [executeAttempts, setExecuteAttempts] = useState(
    initialExecuteAttempts
  );
  const [isExecuting, setIsExecuting] = useState(false); // New state for execute status

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime((prev) => {
          const newElapsedTime = prev + 1;
          localStorage.setItem("elapsedTime", newElapsedTime);
          return newElapsedTime;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (elapsedTime >= randomTimeRef.current) {
      setIsRunning(false);
    }
  }, [elapsedTime]);

  useEffect(() => {
    localStorage.setItem("randomTime", randomTimeRef.current);
    localStorage.setItem("executeAttempts", executeAttempts);
  }, [executeAttempts]);

  const remainingTime = Math.max(randomTimeRef.current - elapsedTime, 0);

  const submitHandler = async () => {
    try {
      const parameters = userInput;
      // .replaceAll("\n", " ").split(" ");
      const payload = {
        code: userCode,
        input: parameters,
        language: language,
        ProgramName: retrievedDetails.TestName,
        ProgramId: "NA",
        UserName: userName,
      };

      if (language === "c") {
        submitCsharpCodeDispatch(payload);
      } else {
        submitCodeDispatch(payload);
      }

      dispatch(submitTestReset());
      dispatch(resetRunCount());
      setTestCasesOutput({});
      setAttemptCount((prev) => prev + 1);
      setOpenModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewAttempt = () => {
    const timeInput = parseInt(newTime, 10);
    if (!isNaN(timeInput) && timeInput > 0) {
      randomTimeRef.current = timeInput;
      setElapsedTime(0);
      setIsRunning(true);
      localStorage.setItem("randomTime", timeInput);
      setOpenModal(false);
      setNewTime("");
    } else {
      alert("Please enter a valid number of seconds.");
    }
  };

  const handleChangeTime = () => {
    const timeInput = parseInt(newTime, 10);
    if (!isNaN(timeInput) && timeInput > 0) {
      randomTimeRef.current = timeInput;
      setOpenChangeTimeModal(false);
      setNewTime("");
    } else {
      alert("Please enter a valid number of seconds.");
    }
  };

  const handleExecuteTestcases = async () => {
    setIsExecuting(true);
    await executeTestcases(); // Execute test cases
    setExecuteAttempts((prev) => prev + 1); // Increment execute attempts
    setIsExecuting(false); 
    setOpenModal(true);
    // Reset executing status
  };

  return (
    <>
      {elapsedTime < randomTimeRef.current && (
        <Typography variant="body2" sx={{ marginLeft: 2 }}>
          Time left: {Math.ceil(remainingTime)} seconds
        </Typography>
      )}
      <Typography variant="body2" sx={{ marginLeft: 2 }}>
        Attempts: {attemptCount}
      </Typography>
      <Typography variant="body2" sx={{ marginLeft: 2 }}>
        Execute Testcases Attempts: {executeAttempts}
      </Typography>
      <Button
        disabled={elapsedTime < randomTimeRef.current || !userCode}
        color="success"
        variant="contained"
        sx={{ paddingBlock: 0.6, marginInlineStart: 1.4 }}
        onClick={submitHandler}
        startIcon={
          <PlayArrowIcon fontSize="20" sx={{ padding: 0, margin: 0 }} />
        }
      >
        Run
      </Button>
      <Button
        disabled={!userCode || isExecuting || istestExecute} // Enable if no build errors and not executing
        color="success"
        variant="contained"
        sx={{ paddingBlock: 0.6, marginInlineStart: 1.4 }}
        onClick={handleExecuteTestcases}
      >
        Execute Testcases
      </Button>
      {/* <Button
        color="success"
        variant="contained"
        sx={{ paddingBlock: 0.6, marginInlineStart: 1.4 }}
        onClick={() => toggleInput((prev) => !prev)}
        disabled={isExecuting} // Disable while executing test cases
      >
        Add Input
      </Button> */}
      <Button
        color="warning"
        variant="outlined"
        sx={{ paddingBlock: 0.6, marginInlineStart: 1.4 }}
        onClick={() => setOpenChangeTimeModal(true)}
      >
        Change Time Left
      </Button>

      {/* Modal for new attempt */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div
          style={{
            padding: 20,
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: 8,
          }}
        >
          <Typography variant="h6">
            Do you want to make another attempt?
          </Typography>
          <TextField
            label="Enter seconds for new time"
            type="number"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleNewAttempt}
            sx={{ marginTop: 2 }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenModal(false)}
            sx={{ marginTop: 2, marginLeft: 1 }}
          >
            No
          </Button>
        </div>
      </Modal>

      {/* Modal for changing time */}
      <Modal
        open={openChangeTimeModal}
        onClose={() => setOpenChangeTimeModal(false)}
      >
        <div
          style={{
            padding: 20,
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: 8,
          }}
        >
          <Typography variant="h6">Change Time Left</Typography>
          <TextField
            label="Enter new seconds"
            type="number"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Reason for changing time"
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangeTime}
            sx={{ marginTop: 2 }}
          >
            Change Time
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenChangeTimeModal(false)}
            sx={{ marginTop: 2, marginLeft: 1 }}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}

const mapState = (state) => ({
  retrievedDetails: state.retrieveDetails.data,
  userCode: state.codeEditor.userCode,
  submitCodeData: state.submitCode.data,
});

const mapDispatch = {
  submitCodeDispatch: submitCode,
  submitCsharpCodeDispatch: submitCsharpCode,
};

const SubmitHandler = connect(mapState, mapDispatch)(SubmitHandlerComponent);

export default SubmitHandler;
