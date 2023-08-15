import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Modal,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import StyledButton from "../components/styledButton";
import StyledTextField from "../components/styledTextField";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

// Redux
import { useDispatch } from "react-redux";
import {
  logoutUser,
  updatePassword,
  updateUser,
} from "../redux/actions/userActions";
import isEmail from "validator/lib/isEmail";

const Settings = ({ user, error }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  // logout
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  // modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Edit Profile
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [isError, setIsError] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const handleEdit = () => {
    if (isEmail(email) === false) {
      setIsError(true);
    }
    dispatch(updateUser(name, email));
    window.location.reload();
  };

  // Update Password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [passOpen, setPassOpen] = useState(false);

  const handleUpdatePassword = () => {
    if (newPassword.length < 8) {
      setIsValid(true);
      return;
    }
    if (confirmPassword !== newPassword) {
      setIsMatch(true);
      return;
    }
    dispatch(updatePassword(oldPassword, newPassword, confirmPassword));
    window.location.reload();
  };

  return (
    <Box sx={{ width: { xs: "96%", md: "75%" } }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            sx={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <AssignmentIndIcon sx={{ marginRight: "8px" }} />
            Account details
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: "left", paddingX: "35px" }}>
          <Typography variant="h6">Full Name</Typography>
          <Typography variant="subtitle1">{user?.name}</Typography>
          <Typography variant="h6">Email</Typography>
          <Typography variant="subtitle1">{user?.email}</Typography>
          <Typography variant="h6">Password</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle1">************</Typography>
            <IconButton
              sx={{ height: "20px", width: "20px", marginLeft: "8px" }}
            >
              <VisibilityOffIcon sx={{ fontSize: "18px" }} />
            </IconButton>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography
            sx={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <EditIcon sx={{ marginRight: "8px" }} />
            Edit Account Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "300px" }}>
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
            <StyledButton
              title="Save Changes"
              mode="dark"
              validation={!name || !email}
              onClick={() => setEditOpen(true)}
            />
            <Modal
              open={editOpen}
              onClose={() => setEditOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ marginBottom: "10px" }}
                >
                  Are you sure you want to save changes?
                </Typography>
                <Box sx={{ display: "flex", gap: "0 10px" }}>
                  <StyledButton
                    title="Save Changes"
                    mode="light"
                    width="140px"
                    onClick={() => handleEdit()}
                  />
                  <StyledButton
                    title="Close"
                    mode="dark"
                    width="120px"
                    onClick={() => setEditOpen(false)}
                  />
                </Box>
              </Box>
            </Modal>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography
            sx={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <VpnKeyIcon sx={{ marginRight: "8px" }} />
            Change Password
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "300px" }}>
            {error && (
              <Typography variant="body2" sx={{ color: "red" }}>
                Wrong password entered, Try Again!
              </Typography>
            )}
            <StyledTextField
              title="Current Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <StyledTextField
              title="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={isValid}
              helperText={
                isValid ? "Password must have at least 8 characters!" : ""
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
            <StyledButton
              title="Save Changes"
              mode="dark"
              validation={!name || !email}
              onClick={() => setPassOpen(true)}
            />
            <Modal
              open={passOpen}
              onClose={() => setPassOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ marginBottom: "10px" }}
                >
                  Are you sure you want to save changes?
                </Typography>
                <Box sx={{ display: "flex", gap: "0 10px" }}>
                  <StyledButton
                    title="Save Changes"
                    mode="light"
                    width="140px"
                    onClick={() => handleUpdatePassword()}
                  />
                  <StyledButton
                    title="Close"
                    mode="dark"
                    width="120px"
                    onClick={() => setPassOpen(false)}
                  />
                </Box>
              </Box>
            </Modal>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography
            sx={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <LogoutIcon sx={{ marginRight: "8px" }} />
            Logout
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "8px" }}>
            Wanna Logout?
          </Typography>
          <StyledButton
            title="Logout"
            mode="dark"
            width="160px"
            onClick={() => handleOpen()}
          />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ marginBottom: "10px" }}
              >
                Are you sure you want to logout?
              </Typography>
              <Box sx={{ display: "flex", gap: "0 10px" }}>
                <StyledButton
                  title="Logout"
                  mode="light"
                  width="120px"
                  onClick={() => handleLogout()}
                />
                <StyledButton
                  title="Close"
                  mode="dark"
                  width="120px"
                  onClick={() => handleClose()}
                />
              </Box>
            </Box>
          </Modal>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Settings;
