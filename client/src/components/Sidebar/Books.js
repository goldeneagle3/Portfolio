import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import { config } from "../../config/config";
import auth from "./../../auth/auth-helper";
import DeleteBook from "../../book/DeleteBook";
import EditIcon from "@mui/icons-material/Edit";
import SectionHeading from "../Typography/SectionHeading";

export default function Books({ books, removeBook }) {
  const jwt = auth.isAuthenticated();

  return (
    <Box>
      <SectionHeading header="Books" />
      <Grid container spacing={1}>
        {books?.map((item, i) => (
          <Grid item key={i} xs={12} sm={6}  >
            <Card sx={{ maxWidth: '100%',p:0.5 }}  >
              <CardHeader title={
                <Typography sx={{fontSize:15,fontWeight:'bold'}} align="center" noWrap={true} variant="h6" gutterBottom > {item.title} </Typography>
              } subheader={
                <Box sx={{display:'flex',justifyContent:'center'}} >
                  <Typography noWrap={true} sx={{fontSize:13}} >{item.status}</Typography>
                </Box>
              } />
              <CardMedia
                component="img"
                height="250"
                image={config.ServerURI + "/books/photo/" + item._id}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Button variant="contained" color="primary" href={item.link}>
                  <Typography> Buy It </Typography>
                </Button>
                {auth.isAuthenticated() && (
                  <Box
                    sx={{
                      display: "flex",
                      ml: 1,
                      textAlign: "center",
                      alignItems: "center",
                      gap:1
                    }}
                  >
                    <Link to={"/books/edit/" + item._id}>
                      <Typography>Edit</Typography>
                    </Link>
                    |
                    <DeleteBook book={item} onRemove={removeBook} />
                  </Box>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
