const router = require("express").Router();
const emailController = require("../../controllers/emailController");
router.route("/")
  .post(emailController.sendEmails);
router.route("/invite")
  .post(emailController.sendInvite);
module.exports = router;