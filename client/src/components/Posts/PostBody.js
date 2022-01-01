import { CardContent, Typography } from '@mui/material'
import React from 'react'

export default function PostBody({post}) {
  return (
    <CardContent>
    <Typography align='center' gutterBottom variant="h5" component="div">
      {post.title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {post.description}
    </Typography>
  </CardContent>
  )
}
