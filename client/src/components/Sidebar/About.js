import { Box, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import SectionHeading from '../Typography/SectionHeading'

const texts = [
  "A junior MERN Developer",
  "+1.5 years coding experience.",
  "Love to learn new technologies and staffs.",
  "Learning and trying to code cleaner and neater.",
  "Learning and trying to implement testing with TDD.",
  "Working on thinking more creative is the only sustenance of life.",
  "Big fan of Friedrich Nietzsche. "
]

export default function About() {
  return (
    <Box>
      <SectionHeading header="About" />
      <List>
        {
          texts.map((i,index) => (
            <ListItem key={index} >
              <ListItemText primary={"- "+i} />
            </ListItem>
          ))
        }
      </List>
    </Box>
  )
}
