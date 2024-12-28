import Options from "./sandbox/Options";
import { connect } from "react-redux";
import MonacoEditor from "./sandbox/MonacoEditor";
import { useState } from "react";

const programmingLanguages = [
  { name: "java", id: 1 },
  { name: "python", id: 2 },
];

function SandboxComponent({}) {
  const [theme, setTheme] = useState();

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{ width: "100%", height: "11%" }}
        className="bg-nareshit-primary border-b border-gray-200 px-4 py-2 flex items-center justify-between align-middle shadow-md"
      >
        <Options
          programmingLanguages={programmingLanguages}
          setTheme={setTheme}
          theme={theme}
        />
      </div>
      <div style={{ width: "100%", height: "88%", backgroundColor: "#FFFFFF" }}>
        {/* Adjust the backgroundColor value to the desired color */}
        <MonacoEditor theme={theme} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

const Sandbox = connect(mapStateToProps, mapDispatchToProps)(SandboxComponent);

export default Sandbox;
