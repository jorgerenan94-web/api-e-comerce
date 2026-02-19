const productsModel = require("../models/legacy/products_2");

function validadeCreateProduct(req, res, next){// Middleware para validar os dados ao criar um produto
    const { name, price, category_id } = req.body// Extrai os dados do corpo da requisição

    if(!name || !price || !category_id){
        return res.status(400).send({ error: "Nome, preço e categoria_id são obrigatórios."})
    }

    next()
}

async function validadeDeleteProduct(req, res, next){// Middleware para validar os dados ao deletar um produto
    const { id } = req.params    
    const product = await productsModel.findByPk(id)

    if(!product){
        return res.status(404).send({ message: `Produto com Id ${id} não encontrado middleware.`})
    }
    next()// Continua para o próximo middleware ou controlador
}

function validadeProductNoId(req, res, next){
    const { id } = req.params
    
    if(!id){
        return res.status(400).send({ error: "O id é obrigatório."})
    }

    next()
}

async function validadeUpdateProduct(req, res, next){
    const { id } = req.params
    const { name, price, category_id} = req.body

     if(!id || !name || !price || !category_id){
        return res.status(400).send({ error: "Nome, preço, categoria_id e id são obrigatórios."})
    }

    const produto = await validateExistingIdProduct(id)

    if(!produto){
        return res.status(404).send({ message: `Produto com Id ${id} não encontrado middleware.`})
    }
    next()
}

async function validadePatchUpdateProduct(req, res, next){
    const { id } = req.params
    const { price } = req.body
    
    if(!price){
        return res.status(400).send({ error: "Preço é obrigatórios."})
    }

    const produto = await validateExistingIdProduct(id)

    if(!produto){
        return res.status(404).send({ message: `Produto com Id ${id} não encontrado middleware.`})
    }

    next()
}

async function validadeGetIdProduct(req, res, next){
    const { id } = req.params
    
    if(!id){
        return res.status(400).send({ error: "O id é obrigatório."})
    }

    const produto = await validateExistingIdProduct(id)

    if(!produto){
        return res.status(404).send({ message: `Produto com Id ${id} não encontrado middleware.`})
    }

    next()
}

function validadeGetNameProduct(req, res, next){
    const { name } = req.params

     if(!name){
        return res.status(400).send({ error: "O nome é obrigatório."})
    }

    next()
}

async function validateExistingIdProduct(id){
    const product = await productsModel.findByPk(id)

   return product

}
module.exports = {// Exporta as funções de middleware
    validadeCreateProduct,
    validadeDeleteProduct,
    validadeProductNoId,
    validadeUpdateProduct,
    validadePatchUpdateProduct,
    validadeGetIdProduct,
    validadeGetNameProduct
}