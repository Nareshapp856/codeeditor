import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { connect } from "react-redux";
import { reportDispatch } from "../redux/actions";
import { useEffect } from "react";
import { persistKey } from "../redux";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const ReportComponent = ({ report, open, onClose, problemSet }) => {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  const handleSubmit = () => {
    if (!reason) {
      setError(true);
    } else {
      report({
        reason,
        description,
        user: { ...user, data: user, role: "student" },
        data: {
          req: localStorage.getItem("req"),
          res: localStorage.getItem("res"),
          testId: localStorage.getItem("testId"),
          problemSet: {
            ...problemSet,
            data: problemSet.data
              ? JSON.stringify(problemSet.data).substring(0, 40)
              : null,
          },
        },
      });
      setReason("");
      setDescription("");
      setError(false);
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="report-modal-title"
      aria-describedby="report-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="report-modal-title" variant="h6" component="h2">
          Report Issue
        </Typography>
        <TextField
          label="Reason"
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            if (e.target.value) setError(false);
          }}
          required
          error={error}
          helperText={error ? "Reason is required" : ""}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
        />
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const mapState = (state) => ({
  problemSet: state.problemSet,
});

const mapDispatch = {
  report: reportDispatch,
};

const Report = connect(mapState, mapDispatch)(ReportComponent);

export default Report;
