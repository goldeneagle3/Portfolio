import React, { useEffect, useState } from "react";
import { Grid, Stack } from "@mui/material";

import { list, topList } from "./api-post";
import SinglePost from "./../components/Posts/SinglePost";
import Heading from "../components/Typography/Heading";
import PostSkeleton from "../components/skeletons/PostSkeleton";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [tops, setTops] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load Whole Projects
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  // Load Top Projects
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    topList(signal).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        setTops(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  const removePost = (post) => {
    const updatedPost = [...posts];
    const index = updatedPost.indexOf(post);
    updatedPost.splice(index, 1);
    setPosts(updatedPost);
  };

  const removeTops = (post) => {
    const updatedPost = [...tops];
    const index = updatedPost.indexOf(post);
    updatedPost.splice(index, 1);
    setTops(updatedPost);
  };

  return (
    <div>
      {loading ? (
        <PostSkeleton />
      ) : (
        <Stack spacing={1} sx={{ textAlign: "center" }}>
          <Heading header="Top Projects" />
          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            {tops?.map((item, i) => (
              <Grid item key={i} xs={12} sm={6} md={6}>
                <SinglePost post={item} removePost={removeTops} />
              </Grid>
            ))}
          </Grid>
          <Heading header="Projects" />
          <Grid sx={{ flexGrow: 1 }} container spacing={4}>
            {posts?.map((item, i) => (
              <Grid item key={i} xs={12} sm={6} md={6}>
                <SinglePost post={item} removePost={removePost} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
    </div>
  );
}
