const express = require("express");// Importa o módulo Express para criar rotas e lidar com requisições HTTP
const router = express.Router();

const categoriesController = require("../controllers/categories");
const categoriesMiddlewares = require("../middlewares/categories");

router.post("/categories", categoriesMiddlewares.validateInsertCategory, categoriesController.insertCategory)

module.exports = router;