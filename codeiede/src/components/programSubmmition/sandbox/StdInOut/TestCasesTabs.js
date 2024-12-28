import { Tabs, Tab, IconButton } from "@mui/material";
import { createSvgIcon } from "@mui/material/utils";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  removeTestCaseItem,
  setTestCaseItem,
} from "../../../../redux/slices/ProgramSubmmitionSlice";
import { executeCode } from "../../../../redux/actions";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";

const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);

function TestCasesTabsComponect({
  selectedTask,
  setSelectedTask,
  tabs,
  programName,
  executeCodeDispatch,
  files,
  selectedFile,
  executeCodeResponse,
  executingCode,
  executingCodeError,
  executdeCodeErrorObj,
}) {
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const { testCases } = useSelector((store) => store.programSubmmition);
  const handleTaskChange = (_, newTask) => {
    setSelectedTask(newTask);
  };

  const executeHandler = (id) => {
    const Code = files[selectedFile]?.code;
    const Language = files[selectedFile]?.language;
    const UserName = user?.username || "Guest";
    const Parameters = files[selectedFile]?.testCases?.[id]?.input || "";

    executeCodeDispatch({
      Code,
      Language,
      ProgramName: programName,
      UserName,
      Parameters,
    });
  };

  const handleAdd = () => {
    dispatch(
      setTestCaseItem({
        key:
          Number(Object.keys(testCases)[Object.keys(testCases).length - 1]) + 1,
        value: {
          name: `Task ${
            // Number(Object.keys(testCases)[Object.keys(testCases).length - 1]) +
            // 2
            ""
          }`,
          id:
            Number(Object.keys(testCases)[Object.keys(testCases).length - 1]) +
            1,
          input: "",
          outpt: "",
        },
      })
    );

    setSelectedTask(
      Number(Object.keys(testCases)[Object.keys(testCases).length - 1]) + 1
    );
  };

  return (
    <>
      <Tabs
        value={selectedTask}
        onChange={handleTaskChange}
        sx={{ display: "flex", alignItems: "center" }}
      >
        {Object.values(tabs).map((tab, index) => (
          <Tab
            key={tab.id}
            sx={{ fontSize: "1rem" }}
            label={tab.name + (index + 1)}
            value={tab.id}
            iconPosition="end"
            icon={
              <div className="space-x-1">
                <PlayArrowIcon
                  color="success"
                  fontSize="medium"
                  onClick={() => executeHandler(tab.id)}
                />
                <DeleteOutlineIcon
                  color="error"
                  fontSize="medium"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(removeTestCaseItem(tab.id));
                    setSelectedTask(Number(Object.keys(testCases)[0]));
                  }}
                />
              </div>
            }
          />
        ))}
      </Tabs>
      <IconButton
        sx={{ marginInlineStart: 1 }}
        color="primary"
        onClick={handleAdd}
      >
        <PlusIcon />
      </IconButton>
    </>
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

const TestCasesTabs = connect(mapState, mapDispatch)(TestCasesTabsComponect);

export default TestCasesTabs;
