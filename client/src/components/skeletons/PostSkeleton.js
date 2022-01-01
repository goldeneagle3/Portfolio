import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function PostSkeleton() {
  return (
    <Grid container spacing={2} >
      {[1, 2, 3, 4, 5,6].map((item, i) => (
        <Grid item xs={6} key={(item, i)}>
          <Box>
            <Skeleton variant="rectangular" height={240} />
          </Box>
          <Box>
            <Skeleton variant="text" height={50} />
            <Skeleton variant="text" height={125} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
