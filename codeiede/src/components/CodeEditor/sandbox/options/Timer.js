import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { setShouldCount, setTimer } from "../../../../redux/slices/examSlice";

function Timer({ timer, shouldTimerCount, setTimerDispatch }) {
  useEffect(() => {
    let interval;
    if (shouldTimerCount) {
      interval = setInterval(() => {
        setTimerDispatch(timer + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer, shouldTimerCount, setTimerDispatch]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return (
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds
    );
  };

  return (
    <div className="flex items-center space-x-1 px-2 py-1">
      <AccessTimeIcon fontSize="small" />
      <Typography variant="body2" color="textSecondary">
        {formatTime(timer)}
      </Typography>
    </div>
  );
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  shouldTimerCount: PropTypes.bool.isRequired,
  setTimerDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.timer.timer,
  shouldTimerCount: state.timer.shouldCount,
});

const mapDispatchToProps = {
  setTimerDispatch: setTimer,
  setShouldCountDispatch: setShouldCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
