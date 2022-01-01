import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import DoorBackIcon from "@mui/icons-material/DoorBack";
import Checkbox from "@mui/material/Checkbox";

import auth from "./../auth/auth-helper";
import { signin } from "./api-auth.js";

export default function Signin(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });
  const [checked, setChecked] = useState(false);

  const handleStatus = (event) => {
    setChecked(event.target.checked);
  };

  const clickSubmit = () => {
    if(!values.email || !values.password){
      return setValues({...values,error: "Please , provide valid email and password!"})
    }
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data && data.error) {
        setValues({
          ...values,
          error: "Email or password wrong ! Please try again.",
        });
      } else {
        auth.authenticate(checked, data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };


  const { from } = props.location.state || {
    from: {
      pathname: "/",
    },
  };

  const { redirectToReferrer } = values;
  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  if (auth.isAuthenticated()) {
    return <Redirect to="/home" />;
  }

  return (
    <Card
      sx={{
        margin: "auto",
        mt: 11,
        p: 0.5,
        maxWidth: 600,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">Open Door</Typography>
        <DoorBackIcon />
      </Box>
      <CardContent>
        <TextField
          id="email"
          type="email"
          label="Email"
          fullWidth
          required
          variant="standard"
          sx={{
            m: 1,
          }}
          value={values.email}
          onChange={handleChange("email")}
        />
        <TextField
          id="password"
          type="password"
          required
          label="Password"
          fullWidth
          variant="standard"
          sx={{
            m: 1,
          }}
          value={values.password}
          onChange={handleChange("password")}
        />
        <br />
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Button color="primary" variant="contained" onClick={clickSubmit}>
          Submit
        </Button>
      </CardActions>
      <Box sx={{display:'flex',alignItems:'center',textAlign:'center'}} >
        <Checkbox
          checked={checked}
          onChange={handleStatus}
          sx={{ml:2, alignItems:'flex-start',textAlign:'left',justifyContent:'flex-start'}}
          inputProps={{ "aria-label": "controlled" }}
        />
        <Typography  sx={{ fontWeight: 500}} >Remember Me</Typography>
      </Box>
    </Card>
  );
}
