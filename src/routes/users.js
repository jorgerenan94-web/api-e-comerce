const express = require("express");
const router = express.Router();

const usersControllers = require("../controllers/users");
const usersMiddlewares = require("../middlewares/users");

router.post("/users", usersMiddlewares.validateCreateUser, usersControllers.createUser);

module.exports = router;