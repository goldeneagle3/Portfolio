import extend from "lodash/extend.js";
import formidable from "formidable";
import fs from "fs";

import Book from "./../models/book.model.js";
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
    let book = new Book(fields);

    console.log(files)

    if (files?.photo) {
      book.photo.data = fs.readFileSync(files.photo?.filepath);
      book.photo.contentType = files.photo?.mimetype;
    }

    try {
      let result = await book.save();
      res.json(result);
    } catch (error) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const bookByID = async (req, res, next, id) => {
  try {
    let book = await Book.findById(id);
    if (!book)
      return res.status("404").json({
        error: "Book not found",
      });
    req.book = book;
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Could not retrieve use book",
    });
  }
};

const photo = (req, res, next) => {
  res.set("Content-Type", req.book.photo.contentType);
  return res.send(req.book.photo.data);
};

const read = (req, res) => {
  return res.json(req.book);
};

const list = async (req,res) => {
  try {
    let posts = await Book.find().sort("-createdAt")
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
    let book = req.book;
    book = extend(book, fields);

    if (files.photo) {
      book.photo.data = fs.readFileSync(files.photo.filepath);
      book.photo.contentType = files.photo.mimetype;
    }

    try {
      await book.save();
      res.json(book);
    } catch (error) {
      return res
        .status(400)
        .json({ error: errorHandler.getErrorMessage(error) });
    }
  });
};

const remove = async (req, res, next) => {
  try {
    let book = req.book;
    let deletedBook = await book.remove();
    res.json(deletedBook);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
};

export default {
  create,
  bookByID,
  photo,
  read,
  list,
  update,
  remove
};
