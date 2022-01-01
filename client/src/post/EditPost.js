import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Paper,
  Typography,
  Divider,
  Button,
  TextField,
  Card,
  CardActions,
  Switch,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth/auth-helper";
import { read, update } from "./api-post.js";
import CancelButton from "./../components/design-button/CancelButton.js";
import WebSiteButton from "./../components/design-button/WebSiteButton.js";
import FormError from "./../errorHandler/FormError";

export default function EditPost({ match }) {
  const [values, setValues] = useState({
    title: "",
    description: "",
    gitLink: "",
    demoLink: "",
    label: "",
    top: false,
    photo: "",
    error: "",
    redirectToHome: false,
  });
  const [progress, setProgress] = useState(false);
  const jwt = auth.isAuthenticated();

  // Load Post Data


  useEffect(() => {
    // SETTING SIGNAL
    const abortController = new AbortController();
    const signal = abortController.signal;

    // GETTING INFORMATION ABOUT PROFIL
    read({ postId: match.params.postId }, signal).then((data) => {
      if (data?.error) {
        setValues({ ...values, redirectToSignin: true });
      } else {
        setValues(data);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  const clickSubmit = () => {
    setProgress(true);
    let postData = new FormData();
    values.title && postData.append("title", values.title);
    values.description && postData.append("description", values.description);
    values.gitLink && postData.append("gitLink", values.gitLink);
    values.demoLink && postData.append("demoLink", values.demoLink);
    values.label && postData.append("label", values.label);
    values.photo && postData.append("photo", values.photo);
    values.top && postData.append("top", values.top);

    update(
      {
        postId: match.params.postId,
      },
      {
        t: jwt.token,
      },
      postData
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        setProgress(false);
      } else {
        setValues({ ...values, redirectToHome: true });
        setProgress(false);
      }
    });
  };

  const clearForm = () => {
    setValues({ title: "", description: "", gitLink: "", demoLink: "" });
  };

  const handleChangeTop = (event) => {
    setValues({ ...values, top: event.target.checked });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  if (values.redirectToHome) {
    return <Redirect to="/" />;
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
        EDIT PROJECT
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
        <TextField
          id="label"
          fullWidth
          variant="standard"
          label="Label"
          sx={{
            m: 2,
          }}
          value={values.label}
          onChange={handleChange("label")}
        />
        <Switch
          checked={values.top}
          onChange={handleChangeTop}
          inputProps={{ "aria-label": "controlled" }}
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
