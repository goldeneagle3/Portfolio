import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ImageIcon from "@mui/icons-material/Image";

import auth from "../auth/auth-helper.js";
import { create } from "./api-software";
import FormError from "../errorHandler/FormError.js";
import WebSiteLink from "../components/design-button/WebSiteLink.js";
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import { config } from "../config/config.js";

const NewSoftware = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    photo: "",
    degree: "",
    error: "",
    open: false,
  });
  const [progress, setProgress] = useState(false);
  const jwt = auth.isAuthenticated();

  // ---------- TextField Controller ----------------
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clearForm = () => {
    setValues({
      name: "",
      degree: "",
      photo: "",
    });
  };

  // Create Functionality
  const clickSubmit = async () => {
    if (!values.name || !values.degree) {
      return setValues({ ...values, error: "Fill the required fields!" });
    }

    setProgress(true);
    let softData = new FormData();
    values.name && softData.append("name", values.name);
    values.degree && softData.append("degree", values.degree);
    values.photo && softData.append("photo", values.photo);

    create(
      { softwareId: match.params.softwareId },
      { t: jwt.token },
      softData
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: "500 Server Error" });
        setProgress(false);
      } else {
        setValues({
          ...values,
          open: true,
        });
        setProgress(false);
      }
    });
  };

  // Photo API
  const photoUrl =
    match.params.softwareId &&
    `${config.ServerURI}/softwares/photo/${
      match.params.softwareId
    }?${new Date().getTime()}`;

  return (
    <div>
      <Paper
        elevation={12}
        sx={{
          margin: "auto",
          mt: { xs: 0, md: 9 },
          p: 0.5,
          maxWidth: 600,
          textAlign: "center",
        }}
      >
        <Typography
          align="center"
          gutterBottom
          variant="h6"
          sx={{
            p: 3,
            fontWeight: "bold",
            fontFamily: "Monospace",
            letterSpacing: 3,
          }}
        >
          NEW SOFTWARE
        </Typography>
        <Divider variant="middle" />
        <Card>
          <Box>
            <img
              src={photoUrl}
              alt="Profile"
              style={{ objectFit: "cover", width: "100%" }}
            />
          </Box>
          <br />
          <input
            accept="image/*"
            onChange={handleChange("photo")}
            style={{
              display: "none",
            }}
            id="photo"
            type="file"
          />
          <label htmlFor="photo">
            <Button component="span" variant="contained" sx={{ mb: 2 }}>
              Upload
              <ImageIcon />
            </Button>
          </label>
          <span>{values.photo ? values.photo.name : ""}</span>
          <TextField
            id="name"
            fullWidth
            required
            label="Name"
            variant="standard"
            sx={{
              m: 2,
            }}
            value={values.name}
            onChange={handleChange("name")}
          />
          <TextField
            id="degree"
            fullWidth
            required
            label="Degree"
            variant="standard"
            sx={{
              m: 2,
            }}
            value={values.degree}
            onChange={handleChange("degree")}
          />
          {values.error && <FormError text={values.error} />}
          <CardActions
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CancelButton onClick={clearForm} text="Clear Out" />
            <WebSiteButton onClick={clickSubmit} text="Submit" />
          </CardActions>
        </Card>
      </Paper>
      <Dialog open={values.open}>
        <DialogTitle>New Software</DialogTitle>
        <DialogContent>
          <DialogContentText>New Software successfully created.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <WebSiteLink link="/" text="Go Home" />
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default NewSoftware;
