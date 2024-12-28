import { useContext, useEffect, useState } from "react";
import { Resizable } from "react-resizable";
import Naresh_IT_Logo from "../../assets/Naresh_IT_Logo.png";
import Sandbox from "../../components/programSubmmition/Sandbox";
import StdInOut from "../../components/programSubmmition/sandbox/StdInOut";
import Details from "../../components/programSubmmition/Details";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import SettingsCascader from "../../components/programSubmmition/SettingsCascader";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";

function ProgramSubmmition() {
  const [width, setWidth] = useState(window.innerWidth * 0.6);
  const [height, setHeight] = useState(window.innerHeight * 0.6);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user?.username) navigate("/login");
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-4 border-b border-black flex justify-between items-center">
        <img src={Naresh_IT_Logo} alt="Naresh IT Logo" className="h-12" />

        <SettingsCascader setWidth={setWidth} setHeight={setHeight} />
      </header>

      <div className="flex flex-grow bg-gray-200">
        {/* Sandbox */}
        <div className="relative">
          <Resizable
            width={width}
            height={height}
            minConstraints={[window.innerWidth * 0.2, window.innerHeight * 0.2]}
            maxConstraints={[window.innerWidth * 0.9, window.innerHeight * 0.9]}
            onResize={(_, { size }) => {
              setWidth(size.width);
              setHeight(size.height);
            }}
            handle={
              <div className="absolute top-0 right-0 w-1 bg-gray-500 h-full cursor-e-resize"></div>
            }
          >
            <div className="bg-gray-200">
              <div
                style={{ width: width, height }}
                className="bg-gray-200 overflow-hidden"
              >
                <Sandbox />
              </div>
            </div>
          </Resizable>
          <div className="bg-gray-200">
            <div className="flex-grow flex flex-col justify-end">
              <StdInOut />
            </div>
          </div>
        </div>

        {/* Details */}
        <div
          style={{ width: window.innerWidth - width }}
          className="bg-white p-4 overflow-auto"
        >
          <Details />
        </div>
      </div>
    </div>
  );
}

export default ProgramSubmmition;
