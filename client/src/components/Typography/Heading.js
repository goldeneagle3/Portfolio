import { Box, Typography } from "@mui/material";
import React from "react";

export default function Heading(props) {
  return (
    <Box sx={{p:1.3,bgcolor:'#2E4053',mb:2,borderRadius:'7px'}} >
      <Typography align="center" variant="h4" sx={{ color: "whitesmoke" }}>
        {props.header}
      </Typography>
    </Box>
  );
}
