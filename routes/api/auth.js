const express = require("express");

const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require("../../middlewares");
const { joiUserSchema } = require("../../model/user");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/signup",
  validation(joiUserSchema),
  controllerWrapper(ctrl.register)
);

router.post("/login", validation(joiUserSchema), controllerWrapper(ctrl.login));

router.post("/logout", authenticate, controllerWrapper(ctrl.logout));

router.get("/current", authenticate, controllerWrapper(ctrl.current));

router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(ctrl.avatar)
);

router.get("/verify/:verificationToken", controllerWrapper(ctrl.verify));

router.post("/verify", controllerWrapper(ctrl.verifyAgain));

module.exports = router;
