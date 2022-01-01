import express from 'express'

import userCtrl from '../controllers/user.controller.js'

const router = express.Router() 




router.route("/users").post(userCtrl.create).get(userCtrl.list)

router.route('/auth/signin').post(userCtrl.signin)

router.route('/auth/signout').get(userCtrl.signout)


router
  .route("/users/:userId")
  .get(userCtrl.read)
  .put(userCtrl.requireSignin, userCtrl.update)
  .delete(userCtrl.requireSignin, userCtrl.remove);


router.param("userId",userCtrl.userByID)

export default router