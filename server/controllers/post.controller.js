import extend from "lodash/extend.js";
import formidable from "formidable";
import fs from "fs";

import Post from "./../models/post.model.js";
import errorHandler from "./../helpers/dbErrorHandler.js";



const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Could not uploaded photos",
      });
    }
    let post = new Post(fields);

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.filepath);
      post.photo.contentType = files.photo.mimetype;
    }

    try {
      let result = await post.save();
      res.json(result);
    } catch (error) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(error),
      });
    }
  });
};

const postByID = async (req, res, next, id) => {
  try {
    let post = await Post.findById(id);
    if (!post)
      return res.status("404").json({
        error: "Post not found",
      });
    req.post = post;
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Could not retrieve use post",
    });
  }
};

const photo = (req, res, next) => {
  res.set("Content-Type", req.post.photo.contentType);
  return res.send(req.post.photo.data);
};

const read = (req, res) => {
  return res.json(req.post);
};

const list = async (req,res) => {
  try {
    let posts = await Post.find({top:false}).sort("-createdAt")
    res.status(200).json(posts)
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
}

const topList = async (req,res) => {
  try {
    let posts = await Post.find({top:true}).sort("-createdAt")
    res.status(200).json(posts)
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
}

// Update User
const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }
    let post = req.post;
    post = extend(post, fields);

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.filepath);
      post.photo.contentType = files.photo.mimetype;
    }

    try {
      await post.save();
      res.json(post);
    } catch (error) {
      return res
        .status(400)
        .json({ error: errorHandler.getErrorMessage(error) });
    }
  });
};

const remove = async (req, res, next) => {
  try {
    let post = req.post;
    let deletedPost = await post.remove();
    res.json(deletedPost);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
};

export default {
  create,
  postByID,
  photo,
  read,
  list,
  topList,
  update,
  remove
};
