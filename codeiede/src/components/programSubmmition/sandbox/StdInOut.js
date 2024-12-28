import { useState } from "react";
import {
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  CardContent,
  Card,
  Button,
  Collapse,
  TextField,
} from "@mui/material";
import { submitCode } from "../../../redux/actions";
import { connect, useSelector } from "react-redux";
import { InfoOutlined } from "@mui/icons-material";
import { updateUserCode } from "../../../redux/slices/examSlice";
import TestCasesTabs from "./StdInOut/TestCasesTabs";
import {
  setTestCaseItem,
  setTestCaseItemData,
  setTestCases,
} from "../../../redux/slices/ProgramSubmmitionSlice";
import ExecuteCode from "./StdInOut/ExecuteCode";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

function StdInOutComponent({
  submitCodeData,
  submitCodeIsLoading,
  submitCodeIsStatus,
  submitCodeIsError,
  testCases,
  setTestCaseItemDataDispatch,
  executedData,
  executingCode,
  executingError,
  executedStatus,
}) {
  const [selectedTab, setSelectedTab] = useState("Test Cases");
  const [selectedTask, setSelectedTask] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showUserInput, setShowUserInput] = useState(false);

  const handleChange = (_, newTab) => {
    setSelectedTab(newTab);
  };

  const onInputChange = (e) => {
    setTestCaseItemDataDispatch({
      key: selectedTask,
      property: "input",
      value: e.target.value,
    });
  };

  const onOutputChange = (e) => {
    setTestCaseItemDataDispatch({
      key: selectedTask,
      property: "output",
      value: e.target.value,
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div>
        <Collapse in={showUserInput}>
          <TextField
            sx={{ marginBlock: ".4rem" }}
            id="standard-multiline-static"
            value={userInput}
            onChange={(eventData) => {
              setUserInput(eventData.target.value);
            }}
            label="Enter your input"
            multiline
            fullWidth
            rows={4}
            variant="filled"
          />
        </Collapse>
      </div>

      <div className="flex justify-between items-center">
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          sx={{ minHeight: "unset", minWidth: "unset" }}
        >
          <Tab label="Test Cases" value="Test Cases" />
          <Tab label="Output View" value="Output View" />
        </Tabs>

        <div className="me-3 flex space-x-4">
          <div>
            <ExecuteCode userInput={userInput} />
          </div>
          <div>
            <Button
              variant="contained"
              color="success"
              onClick={() => setShowUserInput((prev) => !prev)}
            >
              Add Input
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 w-full mt-2">
        <Paper elevation={3}>
          {selectedTab === "Test Cases" && (
            <div className="flex">
              <TestCasesTabs
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                tabs={testCases}
              />
            </div>
          )}
        </Paper>
        <Card className="w-full mt-2">
          <CardContent>
            {selectedTab === "Test Cases" && (
              <Box className="flex flex-col gap-4">
                <Box className="flex flex-col gap-2">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Input:
                  </Typography>
                  <textarea
                    style={{ width: "100%" }}
                    className="bg-gray-100"
                    value={testCases[selectedTask]?.input}
                    onChange={onInputChange}
                  />
                </Box>
                <Box className="flex flex-col gap-2">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Expected:
                  </Typography>
                  <textarea
                    className="bg-gray-100 p-3 rounded"
                    value={testCases[selectedTask]?.output || ""}
                    onChange={onOutputChange}
                  />
                </Box>
                <Box className="flex flex-col gap-2">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Output:
                    {executingCode ? (
                      <HourglassBottomIcon color="primary" fontSize="small" />
                    ) : testCases[selectedTask]?.output ===
                      (executedData?.errorMessage ||
                        executedData?.output?.trim()) ? (
                      <DoneIcon sx={{ color: "green", mb: 0.3 }} />
                    ) : (
                      <ClearIcon sx={{ color: "red", mb: 0.3 }} />
                    )}
                  </Typography>
                  <pre
                    style={{
                      color: executedData?.responseCode !== 201 && "red",
                    }}
                    className="bg-gray-100 min-h-12 p-3 rounded"
                  >
                    {executedData?.errorMessage || executedData?.output}
                  </pre>
                </Box>
              </Box>
            )}
            {selectedTab === "Output View" && (
              <div>
                <div className="bg-gray-200 rounded-lg p-6 h-[260px] overflow-y-auto">
                  <code className="text-sm text-gray-800 flex">
                    {executedData?.responseCode === 201 && (
                      <span className="text-gray-600 ms-2">
                        <pre>{executedData?.output}</pre>
                      </span>
                    )}
                    {executedData?.responseCode === 301 && (
                      <span className="text-red-600">
                        <pre>
                          {executedData?.errorMessage || executedData?.output}
                        </pre>
                      </span>
                    )}
                    {submitCodeIsError ? (
                      <span className="text-red-400 ms-2">Error occurred.</span>
                    ) : submitCodeIsLoading ? (
                      <span className="text-yellow-400 ms-2">Loading...</span>
                    ) : null}
                  </code>
                </div>
                {submitCodeIsError && (
                  <Typography variant="body2" color="error">
                    Error occurred. <InfoOutlined fontSize="small" />
                  </Typography>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  submitCodeData: state.submitCode.data,
  submitCodeIsPending: state.submitCode.isPending,
  submitCodeIsLoading: state.submitCode.isLoading,
  submitCodeIsStatus: state.submitCode.status,
  submitCodeIsError: state.submitCode.isError,
  executedData: state.executeCode.data,
  executingCode: state.executeCode.isLoading,
  executingError: state.executeCode.isError,
  executedStatus: state.executeCode.status,
  userCode: state.codeEditor.userCode,
  testCases: state.programSubmmition.testCases,
});

const mapDispatch = {
  submitCode: (item) => submitCode(item),
  setUserCode: (updatedCode) => updateUserCode(updatedCode),
  setTestCaseItemDataDispatch: setTestCaseItemData,
};

const StdInOut = connect(mapState, mapDispatch)(StdInOutComponent);

export default StdInOut;
