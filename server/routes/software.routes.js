import express from "express";

import userCtrl from "../controllers/user.controller.js";
import softCtrl from "../controllers/software.controller.js";

const router = express.Router();

router
  .route("/softwares")
  .get(softCtrl.list)
  .post(userCtrl.requireSignin, softCtrl.create);

router
  .route("/softwares/:softwareId")
  .get(softCtrl.read)
  .put(userCtrl.requireSignin, softCtrl.update)
  .delete(userCtrl.requireSignin, softCtrl.remove);

router.route("/softwares/photo/:softwareId").get(softCtrl.photo);

router.param("softwareId", softCtrl.softwareByID);

export default router;
