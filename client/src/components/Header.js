import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AddIcon from "@mui/icons-material/Add";
import BookIcon from "@mui/icons-material/Book";
import ComputerIcon from "@mui/icons-material/Computer";

import auth from "./../auth/auth-helper";
import { UserContext } from "../UserContext";
import { Tooltip } from "@mui/material";

const drawerWidth = 215;

const Header = (props) => {
  const userLength = useContext(UserContext);
  const { window } = props;
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ backgroundColor: "#283747", height: "100vh" }}>
      <Box
        sx={{
          mt: 3,
          p: 0.5,
          mb: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          color="secondary"
          // sx={{ display: { xs: "none", sm: "flex" } }}
        >
          ENSAR EZBER
        </Typography>
      </Box>
      <Divider />
      <List
        sx={{
          textAlign: "center",
          margin: "auto",
          justifyContent: "center",
          bgcolor: "#283747",
        }}
      >
        <a
          href="https://www.linkedin.com/in/ensar-ezber-5031a9216/"
          style={{ justifyContent: "center", textAlign: "center" }}
        >
          <IconButton sx={{}}>
            <LinkedInIcon color="secondary" />
          </IconButton>
          <Typography sx={{ color: "#0BB4EC" }}>LinkedIn</Typography>
        </a>
        <Box sx={{ justifyContent: "center", textAlign: "center" }}>
          <IconButton sx={{}}>
            <EmailIcon color="secondary" />
          </IconButton>
          <Typography sx={{ color: "#0BB4EC" }}>eezber96@gmail.com</Typography>
        </Box>
        {userLength === 0 && !auth.isAuthenticated() && (
          <NavLink to="/signup" exact>
            <ListItemButton
              sx={{
                bgcolor: "#0BB4EC",
                color: "#283747",
                ":hover": {
                  bgcolor: "$283747",
                  color: "#0BB4EC",
                  borderRadius: "2%",
                },
              }}
            >
              <ListItemText primary="Sign Up" />
            </ListItemButton>
          </NavLink>
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", mt: 8 }}>
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          bgcolor: "#51545b",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Link
              style={{ color: "white", textDecoration: "none", fontSize: 20 }}
              to="/"
            >
              Ensar Ezber
            </Link>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: 3,
              }}
            >
              {auth.isAuthenticated() && (
                <Box
                  sx={{
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Link to="/posts/new">
                    <Tooltip title="Add Project">
                      <AddIcon />
                    </Tooltip>
                  </Link>
                  <Link to="/books/new">
                    <Tooltip title="Add Book">
                      <BookIcon />
                    </Tooltip>
                  </Link>
                  <Link to="/softwares/new">
                    <Tooltip title="Add Software">
                      <ComputerIcon />
                    </Tooltip>
                  </Link>
                </Box>
              )}
              <a
                href="https://www.linkedin.com/in/ensar-ezber-5031a9216/"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <LinkedInIcon color="secondary" />
                <Typography>LinkedIn Profile</Typography>
              </a>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <EmailIcon color="secondary" />
                <Typography color="secondary">eezber96@gmail.com</Typography>
              </Box>
              {userLength === 0 && !auth.isAuthenticated() && (
                <Button
                  color="secondary"
                  sx={{
                    fontWeight: "bold",
                    // display: { xs: "inline", md: "none" },
                  }}
                  onClick={() => history.push("/signup")}
                >
                  SIGN UP
                </Button>
              )}
            </Box>

            <IconButton
              color="secondary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                ml: 1,
                display: { xs: "inline", md: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { lg: drawerWidth },
          flexShrink: { lg: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: "block",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
