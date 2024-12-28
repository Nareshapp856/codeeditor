import MonacoEditor from "./sandbox/MonacoEditor";
import { useState, useEffect, useMemo, useContext } from "react";
import Options from "./sandbox/Options";
import Modal from "../../ui/Modal";
import CodeEditorModal from "../../ui/CodeEditorModal";
import StdInOutComponent from "./sandbox/StdInOut";
import { connect } from "react-redux";
import { setSelectedLanguage } from "../../redux/actions/types";
import {
  resetRunCount,
  setSelectedLanguage as setDefaultLanguage,
  setShouldCount,
  updateUserCode,
} from "../../redux/slices/examSlice";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../../context/UserContext";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function SandboxComponent({
  retrievedDetails,
  setUserCode,
  savedCode,
  startClock,
  selectedLanguage,
  setSelectedLanguageDispatch,
  setDefaultLanguageDispatch,
  resetRunCountDispatch,
}) {
  const [selectedTheme, setSelectedTheme] = useState("vs-dark");
  const [codeEditorExtend, setCodeEditorExtend] = useState(false);
  const [testCasesOutput, setTestCasesOutput] = useState({});
  const navigate = useNavigate();
  const { problemId } = useParams();
  const { user } = useContext(UserContext);
  const [firstSave, setFirstSave] = useState(true);

  const programmingLanguages = useMemo(() => {
    return (
      retrievedDetails?.Languages?.split(",")?.map((language) => ({
        id: language,
        name: language,
      })) || []
    );
  }, [retrievedDetails]);

  useEffect(() => {
    setShouldCount(true);
  }, [setShouldCount]);

  useEffect(() => {
    setDefaultLanguageDispatch(programmingLanguages?.[0]?.id);
  }, [
    programmingLanguages,
    setSelectedLanguageDispatch,
    setDefaultLanguageDispatch,
  ]);

  const DefaultPrograms = useMemo(
    () =>
      retrievedDetails?.DefaultProgram
        ? JSON.parse(retrievedDetails?.DefaultProgram || "{}")
        : "",
    [retrievedDetails]
  );

  useEffect(() => {
    //startClock(true);
    setTestCasesOutput({});
    resetRunCountDispatch();
  }, []);

  useEffect(() => {
    if (!firstSave) {
      setUserCode(
        savedCode[problemId + "::" + String(user?.username || "guest")]?.[
          selectedLanguage
        ]
          ? savedCode[problemId + "::" + String(user?.username || "guest")][
              selectedLanguage
            ]
          : DefaultPrograms[
              programmingLanguages.find(
                (language) => language.id === selectedLanguage
              )?.name || ""
            ] || ""
      );
    } else {
      setUserCode(
        savedCode[problemId + "::" + String(user?.username || "guest")]?.[
          selectedLanguage
        ]
          ? savedCode[problemId + "::" + String(user?.username || "guest")][
              selectedLanguage
            ]
          : DefaultPrograms[
              programmingLanguages.find(
                (language) => language.id === programmingLanguages?.[0]?.id
              )?.name || ""
            ] || ""
      );
      setFirstSave(false);
    }
  }, [
    selectedLanguage,
    setUserCode,
    savedCode,
    DefaultPrograms,
    programmingLanguages,
    problemId,
    user,
  ]);

  const onReset = () => {
    setUserCode(
      DefaultPrograms[
        programmingLanguages.find(
          (language) => language.id === selectedLanguage
        )?.name || ""
      ] || ""
    );
  };

  if (codeEditorExtend) {
    return (
      <Modal
        open={codeEditorExtend}
        ModalView={() => (
          <CodeEditorModal
            language={
              programmingLanguages.find(
                (language) => language.id === selectedLanguage
              )?.name
            }
            selectedTheme={selectedTheme}
            setCodeEditorExtend={setCodeEditorExtend}
          />
        )}
      />
    );
  }

  const navigationHandler = () => {
    if (window.history?.length && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = process.env.REACT_APP_DASHBOARD_URL;
    }
  };

  return (
    <div className="flex flex-col overflow-auto bg-gray-100">
      <div className="flex justify-end mb-2">
        <Button
          onClick={navigationHandler}
          startIcon={<KeyboardBackspaceIcon />}
        >
          More Problems
        </Button>
      </div>

      <div className="bg-white w-full md:px-1 xl:px-2 py-2 flex items-center justify-between gap-y-3 flex-wrap overflow-auto hide-scroll align-middle shadow-md">
        <Options
          programmingLanguages={programmingLanguages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguageDispatch}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          onReset={onReset}
          setCodeEditorExtend={setCodeEditorExtend}
          testCasesOutput={testCasesOutput}
        />
      </div>

      <div className="relative mb-2">
        <div className="h-[360px]">
          <MonacoEditor
            language={
              programmingLanguages.find(
                (language) => language.id === selectedLanguage
              )?.name || ""
            }
            defaultCode={
              DefaultPrograms[
                programmingLanguages.find(
                  (language) => language.id === selectedLanguage
                )?.name || ""
              ]
            }
            selectedTheme={selectedTheme}
          />
        </div>
      </div>

      <hr />

      <div>
        <StdInOutComponent
          testCasesOutput={testCasesOutput}
          setTestCasesOutput={setTestCasesOutput}
          language={
            programmingLanguages.find(
              (language) => language.id === selectedLanguage
            )?.name
          }
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedLanguage: state.codeEditor.selectedLanguage,
  retrievedDetails: state.retrieveDetails.data,
  savedCode: state.monacoReducer.code,
});

const mapDispatchToProps = {
  setUserCode: updateUserCode,
  setSelectedLanguageDispatch: setSelectedLanguage,
  startClock: setShouldCount,
  resetRunCountDispatch: resetRunCount,
  setDefaultLanguageDispatch: setDefaultLanguage,
};

const Sandbox = connect(mapStateToProps, mapDispatchToProps)(SandboxComponent);

export default Sandbox;
