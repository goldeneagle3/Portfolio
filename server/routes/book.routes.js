import express from "express";

import userCtrl from "../controllers/user.controller.js";
import bookCtrl from "../controllers/book.controller.js";

const router = express.Router();

router
  .route("/books")
  .get(bookCtrl.list)
  .post(userCtrl.requireSignin, bookCtrl.create);


router
  .route("/books/:bookId")
  .get(bookCtrl.read)
  .put(userCtrl.requireSignin, bookCtrl.update)
  .delete(userCtrl.requireSignin, bookCtrl.remove);

router.route("/books/photo/:bookId").get(bookCtrl.photo);


router.param("bookId", bookCtrl.bookByID);

export default router;
