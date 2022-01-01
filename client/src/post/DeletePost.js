import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth/auth-helper.js";
import { remove } from "./api-post";
import SnackError from "../errorHandler/SnackError.js";

export default function DeletePost(props) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(false);
  const jwt = auth.isAuthenticated();
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });

  // Ooen Delete Card API
  const clickButton = () => {
    setOpen(true);
  };

  // Delete Shop API
  const deleteTeam = () => {
    setProgress(true);
    remove({ postId: props.post._id }, { t: jwt.token }).then((data) => {
      if (data.error) {
        setIsError({ ...isError, openSnack: true, error: "500 Server Error. Please try again." });
      } else {
        props.onRemove(props.post);
        setProgress(false);
        setOpen(false);
      }
    });
  };

  // Cancel Delete Request API
  const handleRequestClose = () => {
    setOpen(false);
  };

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>
      <SnackError open={isError.openSnack} text={isError.error} />
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Confirm to delete " + props.post?.title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteTeam} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </span>
  );
}

DeletePost.propTypes = {
  post: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};
