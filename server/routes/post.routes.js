import express from "express";

import userCtrl from "../controllers/user.controller.js";
import postCtrl from "../controllers/post.controller.js";

const router = express.Router();

router.route("/posts").get(postCtrl.list).post(postCtrl.create);

router.route("/top/posts").get(postCtrl.topList);

router
  .route("/posts/:postId")
  .get(postCtrl.read)
  .put(userCtrl.requireSignin, postCtrl.update)
  .delete(userCtrl.requireSignin, postCtrl.remove);

router.route("/posts/photo/:postId").get(postCtrl.photo);

router.param("postId", postCtrl.postByID);

export default router;
