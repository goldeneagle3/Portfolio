import extend from "lodash/extend.js";
import formidable from "formidable";
import fs from "fs";

import Software from "./../models/software.model.js";
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
    let software = new Software(fields);

    if (files.photo) {
      software.photo.data = fs.readFileSync(files.photo.filepath);
      software.photo.contentType = files.photo.mimetype;
    }

    try {
      let result = await software.save();
      res.json(result);
    } catch (error) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const softwareByID = async (req, res, next, id) => {
  try {
    let software = await Software.findById(id);
    if (!software)
      return res.status("404").json({
        error: "Software not found",
      });
    req.software = software;
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Could not retrieve use software",
    });
  }
};

const photo = (req, res, next) => {
  res.set("Content-Type", req.software.photo.contentType);
  return res.send(req.software.photo.data);
};

const read = (req, res) => {
  return res.json(req.software);
};

const list = async (req,res) => {
  try {
    let posts = await Software.find().sort("-createdAt")
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
    let software = req.software;
    software = extend(software, fields);

    if (files.photo) {
      software.photo.data = fs.readFileSync(files.photo.filepath);
      software.photo.contentType = files.photo.mimetype;
    }

    try {
      await software.save();
      res.json(software);
    } catch (error) {
      return res
        .status(400)
        .json({ error: errorHandler.getErrorMessage(error) });
    }
  });
};

const remove = async (req, res, next) => {
  try {
    let software = req.software;
    let deletedBook = await software.remove();
    res.json(deletedBook);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
};

export default {
  create,
  softwareByID,
  photo,
  read,
  list,
  update,
  remove
};
