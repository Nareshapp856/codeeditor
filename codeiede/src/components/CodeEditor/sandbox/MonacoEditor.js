import { useRef, useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { connect } from "react-redux";
import { Box, Button, Modal, Typography } from "@mui/material";
import { updateUserCode } from "../../../redux/slices/examSlice";

function MonacoEditorComponent({
  language,
  userCode,
  selectedTheme,
  setUserCode,
}) {
  const editorRef = useRef(null);
  const [showWarn, setShowWarn] = useState(false);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();

    // editor.onKeyDown((event) => {
    //   const { keyCode, ctrlKey, metaKey } = event;
    //   if ((keyCode === 33 || keyCode === 52) && (metaKey || ctrlKey)) {
    //     setShowWarn(true);
    //     event.preventDefault();
    //   }
    // });
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [editorRef, language]);

  const handleEditorChange = (newCode) => {
    setUserCode(newCode);
  };

  return (
    <>
      <Editor
        width="100%"
        height="100%"
        value={userCode}
        language={language}
        options={{
          acceptSuggestionOnCommitCharacter: true,
          acceptSuggestionOnEnter: "on",
          accessibilitySupport: "auto",
          autoIndent: true,
          automaticLayout: true,
          codeLens: true,
          colorDecorators: true,
          contextmenu: false,
          cursorBlinking: "blink",
          cursorSmoothCaretAnimation: false,
          cursorStyle: "line",
          disableLayerHinting: false,
          disableMonospaceOptimizations: false,
          dragAndDrop: false,
          fixedOverflowWidgets: true,
          folding: true,
          foldingStrategy: "auto",
          fontLigatures: true,
          formatOnPaste: false,
          formatOnType: false,
          hideCursorInOverviewRuler: false,
          highlightActiveIndentGuide: true,
          links: true,
          mouseWheelZoom: true,
          multiCursorMergeOverlapping: true,
          multiCursorModifier: "alt",
          overviewRulerBorder: true,
          overviewRulerLanes: 2,
          quickSuggestions: true,
          quickSuggestionsDelay: 100,
          readOnly: false,
          renderControlCharacters: false,
          renderFinalNewline: true,
          renderIndentGuides: true,
          renderLineHighlight: "all",
          renderWhitespace: "none",
          revealHorizontalRightPadding: 30,
          roundedSelection: true,
          rulers: [],
          scrollBeyondLastColumn: 5,
          scrollBeyondLastLine: true,
          selectOnLineNumbers: true,
          selectionClipboard: false,
          selectionHighlight: true,
          showFoldingControls: "mouseover",
          smoothScrolling: true,
          suggestOnTriggerCharacters: true,
          wordBasedSuggestions: true,
          wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
          wordWrap: "on",
          wordWrapBreakAfterCharacters: "\t})]?|&,;",
          wordWrapBreakBeforeCharacters: "{([+",
          wordWrapBreakObtrusiveCharacters: ".",
          wordWrapColumn: 80,
          wordWrapMinified: true,
          wrappingIndent: "none",
          fontSize: 16,
        }}
        onMount={onMount}
        onChange={handleEditorChange}
        theme={selectedTheme}
        editorRef={editorRef}
      />

      <Modal open={showWarn} onClose={() => setShowWarn(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500, // Adjust width for better readability
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 5, // Add border radius for a softer look
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Warning
          </Typography>
          <Typography variant="body1" paragraph>
            Copying and pasting is disabled during test.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "red",
              ":hover": { backgroundColor: "red" },
            }}
            onClick={() => setShowWarn(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  userCode: state.codeEditor.userCode,
});

const mapDispatchToProps = {
  setUserCode: (updatedCode) => updateUserCode(updatedCode),
};

const MonacoEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonacoEditorComponent);

export default MonacoEditor;
