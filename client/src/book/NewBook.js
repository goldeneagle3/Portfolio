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
import { create } from "./api-book";
import FormError from "../errorHandler/FormError.js";
import WebSiteLink from "../components/design-button/WebSiteLink.js";
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";

const NewBook = ({ match }) => {
  const [values, setValues] = useState({
    photo: "",
    title: "",
    link: "",
    description: "",
    status: "",
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

  // Create Functionality
  const clickSubmit = async () => {
    if (!values.title || !values.status) {
      return setValues({ ...values, error: "Fill the required fields!" });
    }

    setProgress(true);
    let bookData = new FormData();
    values.title && bookData.append("title", values.title);
    values.link && bookData.append("link", values.link);
    values.description && bookData.append("description", values.description);
    values.status && bookData.append("status", values.status);
    values.photo && bookData.append("photo", values.photo);

    create({ t: jwt.token }, bookData).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
        setProgress(false);
        console.log(data.error);
      } else {
        console.log(data);
        setValues({
          ...values,
          open: true,
        });
        setProgress(false);
      }
    });
  };

  console.log(values.photo)

  const clearForm = () => {
    setValues({
      title: "",
      status: "",
      link: "",
      description: "",
      photo: "",
    });
  };

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
          NEW BOOK
        </Typography>
        <Divider variant="middle" />
        <Card sx={{ p: 2 }}>
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
            <Button component="span">
              Upload
              <ImageIcon />
            </Button>
          </label>
          <span>{values.photo ? values.photo.name : ""}</span>
          <TextField
            id="title"
            fullWidth
            required
            label="Name"
            variant="standard"
            sx={{
              m: 2,
            }}
            value={values.title}
            onChange={handleChange("title")}
          />
          <TextField
            id="status"
            fullWidth
            label="Status"
            variant="standard"
            sx={{
              m: 2,
            }}
            value={values.status}
            onChange={handleChange("status")}
          />
          <TextField
            id="link"
            fullWidth
            label="Link"
            variant="standard"
            sx={{
              m: 2,
            }}
            value={values.link}
            onChange={handleChange("link")}
          />
          <TextField
            id="description"
            fullWidth
            label="Description"
            variant="standard"
            multiline
            rows={10}
            sx={{
              m: 2,
            }}
            value={values.description}
            onChange={handleChange("description")}
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
        <DialogTitle>New Book</DialogTitle>
        <DialogContent>
          <DialogContentText>New book successfully created.</DialogContentText>
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

export default NewBook;
