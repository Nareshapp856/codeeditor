import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { executeCode } from "../../../../redux/actions";
import { connect } from "react-redux";
import { UserContext } from "../../../../context/UserContext";
import { useContext } from "react";

function ExecuteCodeComponent({
  files,
  selectedFile,
  userInput,
  programName,
  executeCodeResponse,
  executingCode,
  executingCodeError,
  executdeCodeErrorObj,
  executeCodeDispatch,
}) {
  const { user } = useContext(UserContext);
  const executeHandler = () => {
    const Code = files[selectedFile].code;
    const Language = files[selectedFile].language;
    const UserName = user?.username || "Guest";

    executeCodeDispatch({
      Code,
      Language,
      ProgramName: programName,
      UserName,
      Parameters: userInput,
    });
  };

  return (
    <Button
      variant="contained"
      startIcon={<PlayArrowIcon />}
      color="success"
      onClick={executeHandler}
    >
      Run
    </Button>
  );
}

const mapState = (state) => ({
  files: state.programSubmmition.files,
  programName: state.programSubmmition.formData.problemName,
  selectedFile: state.programSubmmition.selectedFile,
  executeCodeResponse: state.executeCode.data,
  executingCode: state.executeCode.isLoading,
  executingCodeError: state.executeCode.isError,
  executdeCodeErrorObj: state.executeCode.statusMessage,
});

const mapDispatch = { executeCodeDispatch: executeCode };

const ExecuteCode = connect(mapState, mapDispatch)(ExecuteCodeComponent);

export default ExecuteCode;
