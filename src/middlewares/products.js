function validadeCreateProduct(req, res, next){// Middleware para validar os dados ao criar um produto
    const { name, price, category_id } = req.body// Extrai os dados do corpo da requisição

    if(!name || !price || !category_id){
        return res.status(400).send({ error: "Nome, preço e categoria_id são obrigatórios."})
    }

    next()
}

function validadeDeleteProduct(req, res, next){// Middleware para validar os dados ao deletar um produto
    const { id } = req.params
    
    if(!id){
        return res.status(400).send({ error: "O id é obrigatório."})
    }

    next()// Continua para o próximo middleware ou controlador
}

function validadeUpdateProduct(req, res, next){
    const { id } = req.params
    const { name, price, category_id} = req.body

     if(!id || !name || !price || !category_id){
        return res.status(400).send({ error: "Nome, preço, categoria_id e id são obrigatórios."})
    }

    next()
}

function validadePatchUpdateProduct(req, res, next){
    const { id } = req.params
    const { price } = req.body
    
    if(!id || !price){
        return res.status(400).send({ error: "Preço e id são obrigatórios."})
    }

    next()
}

function validadeGetIdProduct(req, res, next){
    const { id } = req.params
    
    if(!id){
        return res.status(400).send({ error: "O id é obrigatório."})
    }

    next()
}
module.exports = {// Exporta as funções de middleware
    validadeCreateProduct,
    validadeDeleteProduct,
    validadeUpdateProduct,
    validadePatchUpdateProduct,
    validadeGetIdProduct
}