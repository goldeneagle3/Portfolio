import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Paper,
  Typography,
  Divider,
  Button,
  TextField,
  Card,
  CardActions,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth/auth-helper";
import { createPost } from "./api-post.js";
import CancelButton from "./../components/design-button/CancelButton.js";
import WebSiteButton from "./../components/design-button/WebSiteButton.js";
import FormError from "./../errorHandler/FormError";

export default function NewPost() {
  const [values, setValues] = useState({
    title: "",
    description: "",
    gitLink: "",
    demoLink: "",
    photo: "",
    error: "",
    redirectToHome: false,
  });
  const [progress, setProgress] = useState(false);
  const jwt = auth.isAuthenticated();

  const clickSubmit = () => {
    setProgress(true);
    let postData = new FormData();
    values.title && postData.append("title", values.title);
    values.description && postData.append("description", values.description);
    values.gitLink && postData.append("gitLink", values.gitLink);
    values.demoLink && postData.append("demoLink", values.demoLink);
    values.photo && postData.append("photo", values.photo);

    createPost(
      {
        t: jwt.token,
      },
      postData
    ).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
        setProgress(false);
      } else {
        setValues({ ...values, redirectToHome: true });
        setProgress(false);
      }
    });
  };

  const clearForm = () => {
    setValues({ title: "", description: "", gitLink: "",demoLink:"" });
  };

  const handleChange = (name) => (event) => {
    const value =
      name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  if (values.redirectToHome) {
    return (
      <Redirect
        to="/"
      />
    );
  }

  return (
    <Paper
      elevation={12}
      sx={{
        margin: "auto",
        mt: 11,
        p: 0.5,
        maxWidth: 600,
        height: "100%",
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
        NEW PROJECT
      </Typography>
      <Divider variant="middle" />
      <Card sx={{ p: 1 }}>
        <input
          accept="image/*"
          id="photo"
          onChange={handleChange("photo")}
          style={{
            display: "none",
          }}
          type="file"
        />
        <label htmlFor="photo">
          <Button component="span" variant="contained" sx={{ m: 2 }}>
            Upload
            <ImageIcon />
          </Button>
        </label>
        <span>{values.photo ? values.photo.name : ""}</span>
        <TextField
          id="title"
          fullWidth
          variant="standard"
          label="Title"
          sx={{
            m: 2,
          }}
          value={values.title}
          onChange={handleChange("title")}
        />
        <TextField
          id="description"
          fullWidth
          required
          variant="standard"
          label="Text"
          multiline
          rows={10}
          sx={{
            m: 2,
          }}
          value={values.description}
          onChange={handleChange("description")}
        />
        <TextField
          id="gitLink"
          fullWidth
          variant="standard"
          label="Git Link"
          sx={{
            m: 2,
          }}
          value={values.gitLink}
          onChange={handleChange("gitLink")}
        />
        <TextField
          id="demoLink"
          fullWidth
          variant="standard"
          label="Demo Link"
          sx={{
            m: 2,
          }}
          value={values.demoLink}
          onChange={handleChange("demoLink")}
        />
        {values.error && <FormError text={values.error} />}
        <CardActions
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CancelButton onClick={clearForm} text="Clear" />
          <WebSiteButton onClick={clickSubmit} text="Submit" />
        </CardActions>
      </Card>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
}
