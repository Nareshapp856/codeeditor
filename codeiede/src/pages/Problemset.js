import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Grid,
  Container,
  Fab,
} from "@mui/material";
import Naresh_IT_Logo from "../assets/Naresh_IT_Logo.png";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { resetTimer, setShouldCount } from "../redux/slices/examSlice";
import { connect } from "react-redux";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import ReportIcon from "@mui/icons-material/Report";
import {
  hard_problemSetDispatch,
  problemSetDispatch,
} from "../redux/actions/types";
import { submitTestReset } from "../redux/slices/codeEditorSlice";
import RefreshIcon from "@mui/icons-material/Refresh";
import ReportComponent from "../shared/Report";

function ProblemsetComponent({
  shouldCountDispatch,
  resetTimerDispatch,
  fetchProblemSet,
  problemListData,
  resetSubmitTest,
  hard_problemSet,
}) {
  const navigate = useNavigate();
  const { user, login } = useContext(UserContext);
  const [isAtTop, setIsAtTop] = useState(true);
  const [problemList, setProblemList] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const testId = queryParams.get("testId");
  const userMail = queryParams.get("email");
  const username = queryParams.get("username");
  const q_testcases = queryParams.get("testcases");

  useEffect(() => {
    fetchProblemSet({ testId, userMail });
    resetSubmitTest();
  }, []);

  useEffect(() => {
    if (userMail && username) {
      login({ username, email: userMail });
    } else if (!user.username) {
      navigate("/");
    }
  }, [user.username]);

  useEffect(() => {
    if (problemListData && Array.isArray(problemListData.dbresult)) {
      setProblemList(problemListData.dbresult);
    } else {
      setProblemList([]);
    }
  }, [problemListData]);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const resetExamTimer = () => {
    resetTimerDispatch();
    shouldCountDispatch(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    setIsAtTop(window.scrollY === 0);
  };

  const toggleReport = () => {
    setShowReport((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {showReport && (
        <ReportComponent
          open={showReport}
          onClose={() => setShowReport(false)}
        />
      )}

      <header className="bg-white shadow-md px-4 py-2 border-b flex justify-between items-center">
        <img src={Naresh_IT_Logo} alt="Naresh IT Logo" className="h-[5.8vh]" />
        <p className="text-lg font-medium">{`Welcome, ${
          user?.username || "Guest"
        }`}</p>
      </header>

      <div className="min-h-screen bg-gray-100 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          List of Programs
        </h1>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={2}
            className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {!(Array.isArray(problemList) && problemList.length > 0) ? (
              <p className="mt-2 font-semibold opacity-45 border-t-2 border-l-2 border-gray-200 px-2 py-1 text-xl">
                No problems to solve.
              </p>
            ) : (
              problemList.map((problem) => (
                <Grid item key={problem.ProgramId} width={"100%"}>
                  <motion.div
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <NavLink
                      to={`/problem/${problem.ProgramId}?testcases=${q_testcases}`}
                      onClick={resetExamTimer}
                      className="block w-full h-full"
                    >
                      <Card className="hover:shadow-lg rounded-md">
                        <CardHeader
                          title={problem.TestName}
                          subheader={problem.ProgramId}
                          action={
                            <Button
                              onClick={resetExamTimer}
                              variant="contained"
                              color="primary"
                              size="small"
                            >
                              Solve
                            </Button>
                          }
                        />
                        <CardContent>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {problem.TestDescription}
                          </Typography>
                        </CardContent>
                      </Card>
                    </NavLink>
                  </motion.div>
                </Grid>
              ))
            )}
          </Grid>
        </Container>

        <AnimatePresence>
          {/* Scroll */}
          <Grid
            position="fixed"
            bottom={16}
            right={128}
            sx={{ display: isAtTop ? "none" : "block" }}
          >
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.8 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Fab size="small" onClick={scrollToTop}>
                <UpIcon />
              </Fab>
            </motion.div>
          </Grid>

          {/* refetch */}
          <Grid position="fixed" bottom={16} right={72}>
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.8 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Fab
                size="small"
                onClick={() => hard_problemSet({ testId, userMail })}
              >
                <RefreshIcon />
              </Fab>
            </motion.div>
          </Grid>

          {/* Report */}
          <Grid position="fixed" bottom={16} right={16}>
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.8 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Fab size="small" onClick={toggleReport}>
                <ReportIcon />
              </Fab>
            </motion.div>
          </Grid>
        </AnimatePresence>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  problemListData: state.problemSet.data,
});

const mapDispatch = {
  fetchProblemSet: problemSetDispatch,
  resetTimerDispatch: resetTimer,
  shouldCountDispatch: setShouldCount,
  resetSubmitTest: submitTestReset,

  hard_problemSet: hard_problemSetDispatch,
};

const Problemset = connect(mapState, mapDispatch)(ProblemsetComponent);

export default Problemset;
