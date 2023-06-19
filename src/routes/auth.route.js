const { Router } = require("express");
const { auth, contact, login, loginGet } = require("../controllers/auth.controller");
const router = new Router();

router.get("/contact", auth);
router.post("/user", contact);

router.get("/login",  loginGet )
router.post("/auth/login", login)

module.exports = router;
