import { connect, useDispatch } from "react-redux";
import { submitCode, submitCsharpCode } from "../../../redux/actions";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";
import { submitTestReset } from "../../../redux/slices/codeEditorSlice";
import {
  increaseRunCount,
  resetRunCount,
} from "../../../redux/slices/examSlice";

function SubmitHandlerComponent({
  userCode,
  toggleInput,
  userInput,
  retrievedDetails,
  language,
  submitCodeDispatch,
  submitCsharpCodeDispatch,
  setTestCasesOutput,
  increaseRunCountDispatch,
}) {
  const { user } = useContext(UserContext);
  const userName = user?.username;
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      if (language === "c") {
        submitCsharpCodeDispatch({
          code: userCode,
          input: userInput,
          // .replaceAll("\n", " ").split(" "),
          language: language,
          ProgramName: retrievedDetails.TestName,
          ProgramId: "NA",
          UserName: userName,
        });
      } else {
        submitCodeDispatch({
          code: userCode,
          input: userInput,
          // .replaceAll("\n", " ").split(" "),
          language: language,
          ProgramName: retrievedDetails.TestName,
          ProgramId: "NA",
          UserName: userName,
        });
      }
      dispatch(submitTestReset());
      dispatch(resetRunCount());
      setTestCasesOutput({});
    } catch (error) {}
  };

  return (
    <>
      <Button
        disabled={!userCode}
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
        color="success"
        variant="contained"
        sx={{ paddingBlock: 0.6, marginInlineStart: 1.4 }}
        onClick={() => toggleInput((prev) => !prev)}
      >
        Add Input
      </Button>
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
  increaseRunCountDispatch: increaseRunCount,
};

const SubmitHandler = connect(mapState, mapDispatch)(SubmitHandlerComponent);

export default SubmitHandler;
