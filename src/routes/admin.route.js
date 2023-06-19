const { Router } = require('express')
const {admin, message} = require('../controllers/admin.controller')
const isLogin = require("../middlewares/login.auth")

const router = new Router();

router.get("/admin",isLogin,admin)
router.get("/message", message)

module.exports = router;