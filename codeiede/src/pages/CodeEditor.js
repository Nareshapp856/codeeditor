import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import Sandbox from "../components/CodeEditor/Sandbox";
import Details from "../components/CodeEditor/Details";
import Naresh_IT_Logo from "../assets/Naresh_IT_Logo.png";
import { types } from "../redux/actions/types";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import { UserContext } from "../context/UserContext";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import {
  retrieveDetailsReset,
  retrieveTestCasesReset,
  submitCsharpCodeReset,
  submitTestReset,
} from "../redux/slices/codeEditorSlice";
import { setShouldCount, submitCodeReset } from "../redux/slices/examSlice";
import SandboxTestCases from "../components/CodeEditor/SandboxTestCases";

function CodeEditorComponent({
  isDataRetrieving,
  retrievedData,
  problesetState,
  isDataRetrievingFailed,
  retrieveDataDispatch,
  retrieveDataState,
  shouldCountDispatch,
}) {
  const dispatch = useDispatch();
  const [showTerms, setShowTerms] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const programId = useParams().problemId;
  const { user, login } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    isError: isTestCasesRetrievingFailed,
    isLoading: isTestCasesRetrieving,
  } = useSelector((store) => store.retrieveTestCases);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q_email = queryParams.get("email");
  const q_username = queryParams.get("username");
  const q_testCases = queryParams.get("testcases");

  useEffect(() => {
    if (q_email && q_username) login({ email: q_email, username: q_username });
    else {
      if (!(user.username && user.email)) navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (problesetState === "stale") {
    }
  }, []);

  useEffect(() => {
    //setShowTerms(true);
    setShowTerms(false);
    dispatch(retrieveDetailsReset());
    dispatch(retrieveTestCasesReset());
    dispatch(submitCodeReset());
    dispatch(submitCsharpCodeReset());
    dispatch(submitTestReset());
  }, [dispatch]);

  useEffect(() => {
    if (programId) retrieveDataDispatch(programId);
  }, [retrieveDataDispatch, programId]);

  if (isTestCasesRetrievingFailed || isDataRetrievingFailed) return <Error />;

  if (isTestCasesRetrieving || isDataRetrieving) return <Loading />;

  return (
    retrieveDataState === "reslove" && (
      <>
        <div className="flex flex-col bg-gray-100 hide-scroll min-h-screen">
          {/* Header */}
          <header className="bg-white shadow-md px-4 py-2 border-b flex justify-between items-center">
            {/* Logo and Username */}
            <img
              src={Naresh_IT_Logo}
              alt="Naresh IT Logo"
              className="h-[5.8vh]"
            />
            <p className="text-lg font-medium">{`Welcome, ${
              user?.username || "Guest"
            }`}</p>
          </header>

          {/* Main Content */}
          <main className="flex-1 pt-2 lg:pt-0 lg:flex flex-col lg:flex-row max-h-[92vh] overflow-hidden">
            {/* More Problems */}
            <section></section>

            {/* Sidebar */}
            <aside className="w-full lg:w-1/2 border-r-2 border-gray-200 p-6 border-b-2 borderb-black overflow-y-auto hide-scroll mb-4 max-h-[30vh] lg:max-h-[100%] lg:mb-0">
              <Details />
            </aside>

            {/* Code Editor */}
            <section className="w-full lg:w-1/2 border-b-2 p-6 pt-4 relative overflow-y-auto hide-scroll max-h-[60vh] md:max-h-[60vh] lg:max-h-full">
              {q_testCases === "false" ? <Sandbox /> : <SandboxTestCases />}
            </section>
          </main>

          {/* Footer */}
          <footer className="bg-white shadow-lg">
            {/* Add footer content if needed */}
          </footer>
        </div>

        {/* Terms and Conditions Modal */}
        <Modal
          open={showTerms}
          onClose={(e) => setAgreeToTerms(e.target.checked)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: "600px",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              variant="h5"
              id="modal-modal-title"
              margin={"lg"}
              gutterBottom
            >
              Terms and Conditions for Online Testing
            </Typography>
            <List dense={false} sx={{ maxHeight: "60vh", overflowY: "auto" }}>
              <ListItem>
                <ListItemIcon>
                  <span style={{ fontSize: 18, color: "blue" }}>1.</span>
                </ListItemIcon>
                <ListItemText
                  primary="Academic Integrity"
                  secondary="Uphold academic integrity by completing the test with your own understanding of the concepts."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <span style={{ fontSize: 18, color: "blue" }}>2.</span>
                </ListItemIcon>
                <ListItemText
                  primary="No Collaboration"
                  secondary="Do not share or collaborate with other test-takers during the exam. You are expected to work independently."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <span style={{ fontSize: 18, color: "blue" }}>3.</span>
                </ListItemIcon>
                <ListItemText
                  primary="No External Resources"
                  secondary="Refrain from using unauthorized materials such as outside code snippets, websites, or other students' code. Rely on your own knowledge and the provided resources."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <span style={{ fontSize: 18, color: "blue" }}>4.</span>
                </ListItemIcon>
                <ListItemText
                  primary="No Malicious Code"
                  secondary="Avoid introducing intentional errors or malicious code that could disrupt the testing environment or compromise system security."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <span style={{ fontSize: 18, color: "blue" }}>5.</span>
                </ListItemIcon>
                <ListItemText
                  primary="Respectful Conduct"
                  secondary="Maintain a professional and respectful tone throughout the testing process. Any disruptive or disrespectful behavior may lead to consequences."
                />
              </ListItem>
            </List>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                  />
                }
                label="I have read and agree to the terms and conditions"
              />
              <Button
                disabled={!agreeToTerms}
                variant="contained"
                color="primary"
                style={{ width: "6rem" }}
                onClick={(e) => {
                  setShowTerms(false);
                  shouldCountDispatch(true);
                }}
              >
                Next
              </Button>
            </div>
          </Box>
        </Modal>
      </>
    )
  );
}

const mapState = (state) => ({
  retrievedData: state.retrieveDetails?.data,
  isDataRetrieving: state.retrieveDetails?.isLoading,
  isDataRetrievingFailed: state.retrieveDetails?.isError,
  isTestCasesRetrieving: state.retrieveDetails?.isLoading,
  isTestCasesRetrievingFailed: state.retrieveDetails?.isError,
  retrieveDataState: state.retrieveDetails?.state,
  problesetState: state.problemSet.state,
});

const mapDispatch = {
  retrieveDataDispatch: (data) => ({
    type: types.RETRIEVE_DETAILS_TESTCASES,
    payload: data,
  }),
  shouldCountDispatch: setShouldCount,
};

const CodeEditor = connect(mapState, mapDispatch)(CodeEditorComponent);

export default CodeEditor;
