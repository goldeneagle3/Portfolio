import { Typography } from '@mui/material'
import React from 'react'

export default function SectionHeading({header}) {
  return (
    <Typography color="primary" align='center' sx={{fontSize:25,fontWeight:'500',letterSpacing:'1.5px',p:1}} >
      {header}
    </Typography>
  )
}
