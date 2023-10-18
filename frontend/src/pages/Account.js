import React, { useState, useEffect } from "react";
import { Typography, Box, Button, CircularProgress } from "@mui/material";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../redux/actions/userActions";
import isEmail from "validator/lib/isEmail";
import StyledButton from "../components/styledButton";
import StyledTextField from "../components/styledTextField";
import { useNavigate } from "react-router-dom";
import Metadata from "../components/metadata";

const Account = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  // Getting user
  const { isAuthenticated, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated]);
  return (
    <>
      <Metadata title={"Account - Xtrack.pk"} />
      <Box sx={{ height: "18vh", width: "100%" }}></Box>
      {isAuthenticated ? (
        <Box
          sx={{
            height: "80vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              minHeight: "75vh",
              width: "100%",
              display: "flex",
              alignItems: "center",
              padding: "20px 0",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
              Be our Member!
            </Typography>
            <Typography variant="subtitle1" sx={{ textTransform: "uppercase" }}>
              <Button
                sx={{
                  color: "black",
                  border: mode === "login" ? "1.5px solid black" : "none",
                  marginRight: "8px",
                }}
                onClick={() => setMode("login")}
              >
                Login
              </Button>{" "}
              or
              <Button
                sx={{
                  color: "black",
                  border: mode === "signup" ? "1.5px solid black" : "none",
                  marginLeft: "14px",
                }}
                onClick={() => setMode("signup")}
              >
                Sign Up
              </Button>
            </Typography>
            {mode === "login" ? (
              <Login error={error} />
            ) : (
              <Signup error={error} />
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default Account;

const Login = ({ error }) => {
  const dispatch = useDispatch();
  // Login User Redux
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const handleLogin = () => {
    if (isEmail(email) === false) {
      setIsError(true);
      return;
    }
    dispatch(loginUser(email, password));
  };
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        marginTop: "30px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: { md: "30%", xs: "95%" } }}>
        <StyledTextField
          title="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={isError}
          helperText={isError ? "Invalid Email!" : ""}
        />
        <StyledTextField
          title="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography
            variant="subtitle2"
            sx={{ marginBottom: "10px", color: "red" }}
          >
            Invalid email or password!
          </Typography>
        )}
        <StyledButton
          title="LOGIN"
          mode="dark"
          validation={!email || !password}
          onClick={() => handleLogin()}
        />
      </Box>
    </Box>
  );
};

const Signup = ({ error }) => {
  // Register user
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const handleSignUp = () => {
    if (isEmail(email) === false) {
      setIsError(true);
      return;
    }
    if (confirmPassword !== password) {
      setIsMatch(true);
      return;
    }
    if (password.length < 8) {
      setIsValid(true);
      return;
    }
    // Validation for existing email address (to be added later)
    dispatch(registerUser(name, email, password));
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        marginTop: "30px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: { md: "30%", xs: "95%" } }}>
        <StyledTextField
          title="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <StyledTextField
          title="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={isError}
          helperText={isError ? "Invalid Email!" : ""}
        />
        <StyledTextField
          title="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={isValid}
          helperText={
            isValid ? "Password must contain at least 8 characters!" : ""
          }
        />
        <StyledTextField
          title="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={isMatch}
          helperText={isMatch ? "Confirm Password does not match!" : ""}
        />
        {error && (
          <Typography
            variant="subtitle2"
            sx={{ marginBottom: "10px", color: "red" }}
          >
            Invalid or duplicate email!
          </Typography>
        )}
        <StyledButton
          title="SIGN UP"
          mode="dark"
          validation={!name || !email || !password || !confirmPassword}
          onClick={() => handleSignUp()}
        />
      </Box>
    </Box>
  );
};
