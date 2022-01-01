import React from "react";
import { Grid } from "@mui/material";
import SideMenu from "../components/SideMenu";
import Posts from "../post/Posts";
import Heading from "../components/Typography/Heading";

export default function Home() {
  return (
    <Grid
      container
      sx={{ p: { xs: 0, lg: 7 }, mt: { xs: 0, md: 2 } }}
      spacing={4}
    >
      <Grid item xs={12} md={5} lg={5}>
        <Heading header="Ensar Ezber" />
        <SideMenu />
      </Grid>
      <Grid item xs={12} md={7} lg={7} sx={{ mt: { xs: 3, md: 0 } }}>
        <Posts />
      </Grid>
    </Grid>
  );
}
