import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";

import { Divider } from "@mui/material";
import Schools from "./Sidebar/Schools";
import Languages from "./Sidebar/Languages";
import Abilities from "./Sidebar/Abilities";
import Books from "./Sidebar/Books";
import SnackError from "../errorHandler/SnackError.js";
import { listBooks } from "./../book/api-book";
import { listSoftwares } from "./../software/api-software";
import About from "./Sidebar/About";

export default function SideMenu(props) {
  const [books, setBooks] = useState([]);
  const [softwares, setSoftwares] = useState([]);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });

  // Load Books
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listBooks(signal).then((data) => {
      if (data?.error) {
        setIsError({
          ...isError,
          open: true,
          error: "500 Server Error. Please try again.",
        });
      } else {
        setBooks(data);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  // Load Softwares
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listSoftwares(signal).then((data) => {
      if (data?.error) {
        setIsError({
          ...isError,
          open: true,
          error: "500 Server Error. Please try again.",
        });
      } else {
        setSoftwares(data);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  const removeBook = (book) => {
    const updatedBooks = [...books];
    const index = updatedBooks.indexOf(book);
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  const removeSoftware = (software) => {
    const updatedSoftwares = [...softwares];
    const index = updatedSoftwares.indexOf(software);
    updatedSoftwares.splice(index, 1);
    setBooks(updatedSoftwares);
  };

  return (
    <Paper sx={{ p: 0.2, bgcolor: "#D6EAF8" }}>
      <Schools />
      <Divider variant="middle" />
      <About />
      <Divider variant="middle" />
      <Languages />
      <Divider variant="middle" />
      <Abilities abilities={softwares} removeSoftware={removeSoftware} />
      <Divider variant="middle" />
      <Books books={books} removeBook={removeBook} />
      <SnackError open={isError.openSnack} text={isError.error} />
    </Paper>
  );
}
