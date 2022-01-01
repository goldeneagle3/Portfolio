import React from 'react'

import { CardMedia } from '@mui/material'
import { config } from '../../config/config'

export default function PostHeader({post}) {

  const photoUrl = config.ServerURI + "/posts/photo/"+post?._id

  return (
    <CardMedia
        component="img"
        height="240"
        image={photoUrl}
        alt="Project Photo"
      />
  )
}
