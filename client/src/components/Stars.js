import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box } from '@mui/material';



function NewArray(size) {
  var x = [];
  for (var i = 0; i < size; ++i) {
      x[i] = i;
  }
  return x;
}

export default function Stars({n}) {
  if(n < 1 || n > 5 ){
    return false
  }

  var a = NewArray(n);
  var b = NewArray(5-n);
  return (
    <Box sx={{display:'flex'}} >
      {a.map(n => <StarIcon color='secondary' fontSize='small' key={n} />)}
      {b.map(n => <StarBorderIcon  fontSize='small' key={n} />)}
    </Box>
  )
}
