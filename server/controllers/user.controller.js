import extend from "lodash/extend.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import expressJwt from "express-jwt";

import User from "../models/user.model.js";
import errorHandler from "./../helpers/dbErrorHandler.js";
import config from "./../config/config.js";

// Sign Up / Sign In
const create = async (req, res) => {
  try {
    let validEmail = await User.findOne({ email: req.body.email });
    if (validEmail) {
      return res.status(400).json({
        error: "This email is already used!",
      });
    }
    let validUsername = await User.findOne({ name: req.body.name });
    if (validUsername) {
      return res.status(400).json({
        error: "This username is already taken!",
      });
    }

    let salt = await bcrypt.genSalt(13);
    let hashed_password = await bcrypt.hash(req.body?.password, salt);

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashed_password,
    };

    let newUser = new User(user);

    await newUser.save();

    res.json({
      message: "Account has been created!",
    });
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
};

const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status("401").json({ error: "Wrong credentials" });
    }

    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) {
      return res.status("401").json({ error: "Wrong credentials" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("t", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      token,
      user: {
        _id: user._id,
      },
    });
  } catch (error) {
    return res.status("401").json({ error: "Could not sign in" });
  }
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "signed out",
  });
};

const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["sha1", "RS256", "HS256"],
});

// Getting id
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)

    if (!user)
      return res.status("400").json({
        error: "User not found",
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};

// RUD

// Read Profile / Profile Page
const read = (req, res) => {
  req.profile.password = undefined;
  return res.json(req.profile);
};

const list = async (req,res) => {
  try {
    let users = await User.find()
    res.json(users)
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const update = async (req, res) => {
  let user = req.profile;
  user = extend(user, req.body);
  try {
    await user.save();
    res.json(user);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(error),
    });
  }
};

const remove = async (req, res, next) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};


export default {
  create,
  signin,
  signout,
  requireSignin,
  userByID,
  read,
  list,
  update,
  remove
};
