import { Box, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import SectionHeading from '../Typography/SectionHeading'

export default function Schools(props) {
  return (
    <Box sx={{mt:1}} >
      <SectionHeading header="Schools" />
      <List>
        <ListItem>
          <ListItemText primary="Dede Korkut Anadolu Lisesi" secondary="High School" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Istanbul University " secondary="Business Administration" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Istanbul University(AUZEF) " secondary="Political Science and International Relations " />
        </ListItem>
      </List>
    </Box>
  )
}
