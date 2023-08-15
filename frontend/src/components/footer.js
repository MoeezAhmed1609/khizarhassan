import React from "react";
// Material Ui
import { Box, Stack, Tooltip, IconButton, Typography, Button } from "@mui/material";
import boomwear from "../assets/Wear.png";
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
      name: "Home",
      link: "/",
    },
    {
      name: "Shop",
      link: "/shop",
    },
    {
      name: "About",
      link: "/about",
    },
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
        color: "white",
      }}
    >
      <Box
        sx={{
          height: "15vh",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          color: "black",
        }}
      >
        <Box sx={{ marginLeft: { xs: "0", md: "30px" } }}>
          <img src={boomwear} alt="Boom Wear" style={{ height: "13vh" }} />
        </Box>
        <Stack
          direction="row"
          spacing={2}
          sx={{ marginRight: { xs: "0", md: "30px" } }}
        >
          <Typography
            sx={{ textTransform: "uppercase", marginTop: "8px" }}
            variant="subtitle1"
          >
            Follow us on
          </Typography>
          {socials.map((social, index) => (
            <Link to={social.link} key={index}>
              <Tooltip title={social.title}>
                <IconButton sx={{ color: "black" }}>{social.icon}</IconButton>
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
          padding: "20px 0"
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{ marginRight: { xs: "0", md: "30px" } }}
        >
          {pages.map((page, index) => (
            <Link to={page.link} key={index} style={{ textDecoration: "none" }}>
              <Button
                // onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  letterSpacing: "1.5px",
                  fontWeight: "100",
                  margin: "0 15px",
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
