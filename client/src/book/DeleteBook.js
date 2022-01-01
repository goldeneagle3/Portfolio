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
import { remove } from "./api-book";
import SnackError from "../errorHandler/SnackError.js";

export default function DeleteBook(props) {
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
    remove({ bookId: props.book._id }, { t: jwt.token }).then((data) => {
      if (data.error) {
        setIsError({ ...isError, openSnack: true, error: "500 Server Error. Please try again." });
      } else {
        props.onRemove(props.book);
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
        <DialogTitle>Delete Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Confirm to delete " + props.book?.title}
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

DeleteBook.propTypes = {
  book: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};
