import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import Stars from '../Stars'
import SectionHeading from '../Typography/SectionHeading'

export default function Languages() {
  return (
    <Box>
     <SectionHeading header="Languages" />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns:'repeat(2,1fr)',
          justifyContent: 'center',
          p: 1,
          m: 1,
          gap:3
        }}
      >
        <Box sx={{textAlign:'center',margin:'auto'}} >
          <Typography>
            Turkish
          </Typography>
          <Divider variant='middle' />
          <Stars n={5} />
        </Box>
        <Box sx={{textAlign:'center',margin:'auto'}} >
        <Typography>
            English
          </Typography>
          <Divider variant='middle' />
          <Stars n={3} />
        </Box>
        <Box sx={{textAlign:'center',margin:'auto'}} >
        <Typography>
            German
          </Typography>
          <Divider variant='middle' />
          <Stars n={1} />
        </Box>
        <Box sx={{textAlign:'center',margin:'auto'}} >
        <Typography>
            French
          </Typography>
          <Divider variant='middle' />
          <Stars n={1} />
        </Box>
      </Box>
    </Box>
  )
}
