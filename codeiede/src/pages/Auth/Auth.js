import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    email: user?.email || "",
    username: user?.username || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const { login, error, setError } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });

    // Check email validity
    if (name === "email") {
      setIsEmailValid(validateEmail(value));
    }

    // Check username validity (at least 4 characters)
    if (name === "username") {
      setIsUsernameValid(value.length >= 4);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEmailValid || !isUsernameValid) return;

    setIsLoading(true);
    try {
      await login(credentials);
      navigate("/problemset");
    } catch (error) {
      setError(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timeout);
  }, [error, setError]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-100 to-gray-300"
    >
      <Paper
        elevation={3}
        className="w-full max-w-md p-8 bg-white rounded-md shadow-md"
      >
        <Box mb={4}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary">
            Welcome back! Please enter your credentials to continue.
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={credentials.username}
            onChange={handleChange}
            name="username"
            required
            error={!isUsernameValid}
            helperText={
              !isUsernameValid ? "Username must be at least 4 characters" : ""
            }
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={credentials.email}
            onChange={handleChange}
            name="email"
            required
            error={!isEmailValid}
            helperText={!isEmailValid ? "Invalid email format" : ""}
          />

          <Box mt={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              type="submit"
              disabled={isLoading || !isEmailValid || !isUsernameValid}
              endIcon={
                isLoading ? (
                  <CircularProgress size="small" color="primary" />
                ) : null
              }
            >
              Login
            </Button>
          </Box>
        </form>
        {error && (
          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={() => setError(null)}
            message={error}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
        )}
      </Paper>
    </motion.div>
  );
};

export default Login;
