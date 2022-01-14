import { Card } from '@mui/material'
import React from 'react'
import PostBody from './PostBody'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'

export default function SinglePost({post,removePost}) {
  return (
    <Card  sx={{ maxWidth: '100%',m:1 }} >
      <PostHeader post={post}  />
      <PostBody post={post}  />
      <PostFooter post={post} removePost={removePost} />
    </Card>
  )
}
