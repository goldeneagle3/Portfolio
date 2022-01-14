import { Button, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

export default function PostBody({ post }) {
  const [more, setMore] = useState(false);

  const handleMore = () => {
    setMore(!more);
  };
  return (
    <CardContent>
      <Typography align="center" gutterBottom variant="h5" component="div">
        {post.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {more ? post.description : post.description?.substring(0, 15) + "..."}
        <a onClick={handleMore} style={{ color: "black", cursor: "pointer",marginLeft:'5px' }}>
          {more ? "Read Less" : "Read More"}
        </a>
      </Typography>
    </CardContent>
  );
}
