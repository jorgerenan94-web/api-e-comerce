const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")
const authMiddlewares = require("../middlewares/auth")

router.post(
    "/login",
    authMiddlewares.validateLogin,
    authController.login
)

module.exports = router;