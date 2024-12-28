import SaveIcon from "@mui/icons-material/Save";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { connect } from "react-redux";
import { setAutoSave } from "../../../../redux/slices/examSlice";
import { saveCurrentCode } from "../../../../redux/actions/types";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";

const StyledBadgeSaving = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "green",
    color: "gray",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "80%",
      height: "80%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "2px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const StyledBadgeError = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    color: "gray",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

function SaveComponent({
  isSaving,
  isSavingError,
  saveCodeDispatch,
  language,
  code,
  autoSave,
  setAutoSaveDispatch,
}) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const { user } = useContext(UserContext);
  const { problemId: key } = useParams();

  const onSave = () => {
    saveCodeDispatch({
      key: key + "::" + String(user.username || "guest"),
      code,
      language,
    });
  };

  const onAutoSave = () => {
    setAutoSaveDispatch(!autoSave);
  };

  useEffect(() => {
    let intervalId;
    if (autoSave && language) {
      intervalId = setInterval(() => {
        saveCodeDispatch({
          key: key + "::" + String(user.username || "guest"),
          code,
          language,
        });
      }, 2 * 60);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [language, key, code, autoSave, saveCodeDispatch]);

  // useEffect(() => {
  //   saveCodeDispatch({ key, code, language });
  // }, [code, saveCodeDispatch, key, language]);

  return isSaving ? (
    <StyledBadgeSaving
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      <SaveIcon
        onClick={onSave}
        onDoubleClick={onAutoSave}
        color={autoSave ? "success" : ""}
        className="cursor-pointer text-gray-500"
      />
    </StyledBadgeSaving>
  ) : isSavingError ? (
    <StyledBadgeError
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
      color="warning"
    >
      <SaveIcon
        onClick={onSave}
        onDoubleClick={onAutoSave}
        color="warning"
        className="cursor-pointer text-gray-500"
      />
    </StyledBadgeError>
  ) : (
    <SaveIcon
      onClick={onSave}
      onDoubleClick={onAutoSave}
      onMouseDown={setIsMouseDown}
      onMouseUp={() => setIsMouseDown(false)}
      color={autoSave ? "success" : isMouseDown ? "success" : ""}
      className="cursor-pointer text-gray-500"
    />
  );
}

const mapState = (state) => ({
  isSaving: state.monacoReducer.isSavingLoading,
  isSavingError: state.monacoReducer.isErrorSaving,
  language: state.codeEditor.selectedLanguage,
  code: state.codeEditor.userCode,
  autoSave: state.monacoReducer.autoSave,
});

const mapDispatch = {
  saveCodeDispatch: saveCurrentCode,
  setAutoSaveDispatch: setAutoSave,
};

const Save = connect(mapState, mapDispatch)(SaveComponent);

export default Save;
