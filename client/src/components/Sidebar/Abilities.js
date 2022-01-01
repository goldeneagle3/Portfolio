import React from "react";

import {
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  Box,
} from "@mui/material";

import Stars from "../Stars";
import auth from './../../auth/auth-helper'
import { config } from "../../config/config";
import { Link } from "react-router-dom";
import Edit from "@mui/icons-material/Edit";
import DeleteSoftware from "../../software/DeleteSoftware";
import SectionHeading from "../Typography/SectionHeading";

export default function Abilities({ abilities ,removeSoftware}) {
  return (
    <Stack elevation={1}>
      <SectionHeading header="Softwares" />
      <List>
        {abilities?.map((item, i) => (
          <ListItem key={i}>
            <ListItemIcon>
              <img
                src={config.ServerURI + "/softwares/photo/" + item._id}
                style={{ height: "2em", width: "2em" }}
                alt="Icon"
              />
            </ListItemIcon>
            <ListItemText primary={item.name} />
            <ListItemSecondaryAction>
              {
                auth.isAuthenticated() ? (
                  <Box sx={{display:'flex',alignItems:'center'}} >
                    <Link to={"/softwares/edit/"+item._id} >
                      <Edit />
                    </Link>
                    <DeleteSoftware software={item} onRemove={removeSoftware} />
                  </Box>
                ) : <Stars n={item.degree} />
              }
              
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
