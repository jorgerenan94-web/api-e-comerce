const express = require("express");// Importa o módulo Express para criar rotas e lidar com requisições HTTP
const router = express.Router();// Cria um roteador para definir as rotas relacionadas a produtos

const productsController = require("../controllers/products");// Importa os controladores de produtos para lidar com a lógica de negócios
const productsMiddleware = require("../middlewares/products");

router.get("/productsAll", productsController.getAllProducts)// Define a rota GET /products para obter todos os produtos usando o controlador getAllProducts
router.post("/products", productsMiddleware.validadeCreateProduct, productsController.createProduct)// Define a rota POST /products para criar um novo produto, usando o middleware de validação e o controlador createProduct
router.delete("/products/:id", productsMiddleware.validadeDeleteProduct, productsController.deleteProduct)
router.put("/products/:id", productsMiddleware.validadeUpdateProduct, productsController.updateProduct)
router.patch("/products/price/:id", productsMiddleware.validadePatchUpdateProduct, productsController.patchUpdateProduct)
router.get("/products/:id", productsMiddleware.validadeGetIdProduct, productsController.getProductId)
//router.get("/products/name/:name", productsMiddleware.validadeGetNameProduct, productsController.getProductName)
router.get("/products/name//:name", productsMiddleware.validadeGetNameProduct, productsController.getNameProducts)
module.exports = router;