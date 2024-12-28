import { connect } from "react-redux";
import { submitCode } from "../../../redux/actions";
import { Button } from "@mui/material";
//import { PlayCircleFilled as PlayCircleFilledIcon } from "@mui/icons-material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function SubmitHandlerComponent({ userCode, language, submitCodeDispatch }) {
  const submitHandler = async () => {
    try {
      submitCodeDispatch({
        Code: userCode,
        Language: language,
        ProgramName: "HelloWorld123",
      });
    } catch (error) {}
  };

  return (
    <>
      {/* <Button
        variant="contained"
        sx={{ fontSize: "0.7rem" }}
        onClick={submitHandler}
      >
        build & execute
      </Button> */}
      {/* <PlayCircleFilledIcon
        style={{ fontSize: 40 }}
        className="text-[#32a852] cursor-pointer"
      /> */}

      <Button
        color="success"
        variant="contained"
        size="small"
        sx={{ paddingInline: 1.6, paddingBlock: 0.1, paddingTop: 0.4 }}
        onClick={submitHandler}
        startIcon={
          <PlayArrowIcon fontSize="20" sx={{ padding: 0, margin: 0 }} />
        }
      >
        Run
      </Button>

      {/* <Button
        variant="contained"
        sx={{ fontSize: "0.7rem" }}
        onClick={submitHandler}
      >
        run testcases
      </Button> */}
    </>
  );
}

const mapState = (state) => ({
  userCode: state.codeEditor.present.userCode,
});

const mapDispatch = {
  submitCodeDispatch: (item) => submitCode(item),
};

const SubmitHandler = connect(mapState, mapDispatch)(SubmitHandlerComponent);

export default SubmitHandler;
