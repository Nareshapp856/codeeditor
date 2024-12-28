import { Editor } from "@monaco-editor/react";
import { Button } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { connect } from "react-redux";
import { updateUserCode } from "../redux/slices/examSlice";

function CodeEditorModalComponent({
  userCode,
  language,
  setUserCode,
  selectedTheme,
  setCodeEditorExtend,
}) {
  const editorRef = useRef(null);

  const onModalClose = useCallback(() => {
    setUserCode(editorRef.current?.getValue());
    setCodeEditorExtend(false);
  }, [setUserCode, setCodeEditorExtend]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onModalClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onModalClose]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [editorRef, language]);

  const onMount = (editor, _) => {
    editorRef.current = editor;
    editor.focus();

    editor.onKeyDown((event) => {
      const { keyCode, ctrlKey, metaKey } = event;
      if ((keyCode === 33 || keyCode === 52) && (metaKey || ctrlKey)) {
        event.preventDefault();
      }
    });
  };

  return (
    <div className="h-screen w-full grid place-content-center relative">
      <div
        onMouseDown={(e) => {
          if (e.button === 2) {
            onModalClose();
            e.preventDefault();
          }
        }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <Editor
          width="100%"
          height="100%"
          defaultValue={userCode}
          language={language}
          options={{
            find: {
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
              wordWrap: "off",
              wordWrapBreakAfterCharacters: "\t})]?|&,;",
              wordWrapBreakBeforeCharacters: "{([+",
              wordWrapBreakObtrusiveCharacters: ".",
              wordWrapColumn: 80,
              wordWrapMinified: true,
              wrappingIndent: "none",
              fontSize: 16,
            },
            minimap: { enabled: true },
          }}
          onMount={onMount}
          theme={selectedTheme}
          editorRef={editorRef}
        />
      </div>
      <div className="absolute top-1 right-1">
        <Button onClick={onModalClose}>
          <CloseFullscreenIcon
            style={{ fontSize: 30 }}
            className="text-gray-500 cursor-pointer"
          />
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userCode: state.codeEditor.userCode,
});

const mapDispatchToProps = {
  setUserCode: (updatedCode) => updateUserCode(updatedCode),
};

const CodeEditorModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeEditorModalComponent);

export default CodeEditorModal;
