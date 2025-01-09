const express = require("express");
const router = express.Router();

const {
  register,
  login,
  //   logout,
  //   contactUs,
} = require("../controllers/auth_controller");

router.post("/register", register);

router.post("/login", login);

// router.get("/logout", logout);

// router.post("/send-message", contactUs);

module.exports = router;
