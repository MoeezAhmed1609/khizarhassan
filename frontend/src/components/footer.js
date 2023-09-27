import React from "react";
// Material Ui
import {
  Box,
  Stack,
  Tooltip,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import xtrack from "../assets/xtrack.png";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

const Footer = () => {
  const socials = [
    {
      icon: <TwitterIcon />,
      link: "https://twitter.com/home?lang=en",
      title: "Twitter",
    },
    {
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/",
      title: "Facebook",
    },
    {
      icon: <YouTubeIcon />,
      link: "https://www.youtube.com/",
      title: "YouTube",
    },
    {
      icon: <InstagramIcon />,
      link: "https://www.instagram.com/",
      title: "Instagram",
    },
  ];
  const pages = [
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Terms & Conditions",
      link: "/terms-conditions",
    },
    // {
    //   name: "",
    //   link: "/",
    // },
    {
      name: "Blogs",
      link: "/blogs",
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "black",
      }}
    >
      <Box
        sx={{
          minHeight: "15vh",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "black",
          color: "white",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box>
          <img src={xtrack} alt="Boom Wear" style={{ height: "8vh" }} />
        </Box>
        <Stack direction="row" spacing={2}>
          <Typography
            sx={{ textTransform: "uppercase", marginTop: "8px", fontFamily: "Poppins, sans-serif", }}
            variant="subtitle1"
          >
            Follow us on
          </Typography>
          {socials.map((social, index) => (
            <Link to={social.link} key={index} target="_blank">
              <Tooltip title={social.title}>
                <IconButton sx={{ color: "white" }}>{social.icon}</IconButton>
              </Tooltip>
            </Link>
          ))}
        </Stack>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 0",
          flexDirection: "column",
        }}
      >
        <Stack direction={"row"} spacing={2}>
          {pages.map((page, index) => (
            <Link to={page.link} key={index} style={{ textDecoration: "none" }}>
              <Button
                // onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  letterSpacing: "1.5px",
                  fontWeight: "bold",
                  margin: "0 15px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {page.name}
              </Button>
            </Link>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
