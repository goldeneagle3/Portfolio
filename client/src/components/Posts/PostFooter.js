import React from 'react'
import {Link} from 'react-router-dom'
import { Box } from '@mui/system'
import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';

import auth from './../../auth/auth-helper'
import DeletePost from '../../post/DeletePost';

export default function PostFooter({post,removePost}) {
  
  return (
    <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          p: 1,
          m: 1,
        }}
      >{
        auth.isAuthenticated() ? (
          <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-evenly',gap:2}} >
            <Link to={"/posts/edit/"+post._id} >
              <EditIcon />
            </Link>
            <DeletePost post={post} onRemove={removePost} />
          </Box>
        ) : (
          <Box>
            <Button href={post.gitLink} >
              <GitHubIcon />
            </Button>
            <Button href={post.demoLink} >
              <PreviewIcon />
            </Button>
          </Box>
        )
      }
      </Box>
  )
}
