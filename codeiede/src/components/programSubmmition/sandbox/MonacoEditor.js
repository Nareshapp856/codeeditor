import { useRef, useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { connect } from "react-redux";
import { Box, Button, Modal, Typography } from "@mui/material";
import { updateUserCode } from "../../../redux/slices/examSlice";
import { setUserCode } from "../../../redux/slices/ProgramSubmmitionSlice";

function MonacoEditorComponent({
  theme,
  files,
  selectedFile,
  setUserCodeDispatch,
}) {
  const [value, setValue] = useState();
  const editorRef = useRef(null);

  useEffect(() => {
    setValue(files[selectedFile !== null ? selectedFile : 0]?.code || "");
  }, [files, selectedFile]);

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
  }, [editorRef]);

  return (
    <>
      <Editor
        width="100%"
        height="100%"
        options={{
          acceptSuggestionOnCommitCharacter: true,
          acceptSuggestionOnEnter: "on",
          accessibilitySupport: "auto",
          autoIndent: true,
          automaticLayout: true,
          codeLens: true,
          colorDecorators: true,
          contextmenu: true,
          cursorBlinking: "blink",
          cursorSmoothCaretAnimation: true,
          cursorStyle: "line",
          disableLayerHinting: false,
          disableMonospaceOptimizations: false,
          dragAndDrop: true,
          fixedOverflowWidgets: true,
          folding: true,
          foldingStrategy: "auto",
          fontLigatures: true,
          formatOnPaste: true,
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
          selectionClipboard: true,
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
        value={value}
        theme={theme}
        onMount={onMount}
        editorRef={editorRef}
        onChange={setUserCodeDispatch}
      />

      {/* <Modal open={showWarn} onClose={() => setShowWarn(false)}>
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
          >
            Close
          </Button>
        </Box>
      </Modal> */}
    </>
  );
}

const mapStateToProps = (state) => ({
  files: state.programSubmmition.files,
  selectedFile: state.programSubmmition.selectedFile,
});

const mapDispatchToProps = { setUserCodeDispatch: setUserCode };

const MonacoEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonacoEditorComponent);

export default MonacoEditor;
