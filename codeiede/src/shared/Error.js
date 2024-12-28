// Remove Technical Difficulty
import { CircularProgress } from "@mui/material";

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
      <CircularProgress color="primary" size={50} thickness={4} />
    </div>
  );
}

export default Loading;
