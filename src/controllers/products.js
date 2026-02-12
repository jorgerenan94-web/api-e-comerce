const productsModel = require("../models/products");// Importa o modelo de produtos para interagir com o banco de dados

async function getAllProducts(req, res){// Controlador para obter todos os produtos
     try {
        const result = await productsModel.findAll({
            order:[['id', 'DESC']]
        })
        
        if(!result){
            return res.status(404).send({ message: 'Nenhum produto encontrado'})
        }

        res.status(200).send(result)
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send({ error: 'Erro ao buscar produtos' })
    }
}

async function createProduct(req, res) {// Controlador para criar um novo produto
    const { name, price, category_id } = req.body

    try {    
        const result = await productsModel.create({ name, price, category_id }) 
        res.status(201).send(result)// Envia o produto criado como resposta
    } catch (error) {
        console.error('Erro ao criar produto:', error)
        res.status(500).send({ error: 'Erro ao criar produto'})
    }
}

async function deleteProduct(req, res) {// Controlador para deletar um produto
    const { id } = req.params

    try {
        const result = await productsModel.destroy({ 
            where: {id}
        })

        if(result === 0){
            return res.status(400).send( {message:`Produto com Id ${id} não encontrado controller.`})  
        }
        res.status(200).send({ message: `Produto com Id ${id} deletado com sucesso.`})
    } catch (error) {
        console.error('Erro ao deletar produto:', error)
        res.status(500).send({ error: 'Erro ao deletar produto'})
    }
    
}

async function updateProduct(req, res) {
    const { id } = req.params
    const { name, price, category_id} = req.body

    try {
        const result = await productsModel.update({name, price, category_id}, {where: { id }})
        res.status(200).send({ message: `Produto com o ${id} atualizado com sucesso.`})
    } catch (error) {
        console.error('Erro ao atualizar produto:', error)
        res.status(500).send({ error: 'Erro ao atualizar produto'})
    }
    
}

async function patchUpdateProduct(req, res){
    const { id } = req.params
    const { price } = req.body

    try {
        const result = await productsModel.query(`UPDATE products SET price = $1 WHERE id = $2 RETURNING *;`, [price, id])
        res.status(200).send(result.rows[0])
    } catch (error) {
        console.error('Erro ao atualizar o preço do produto:', error)
        res.status(500).send({ error: 'Erro ao atualizar o preço do produto'})
    }
}

async function getProductId(req, res) {
    const { id } = req.params

    try {
        const result = await productsModel.query(`SELECT * FROM products WHERE id = $1;`, [id])
        res.send(result.rows)
    } catch (error) {
        console.error('Erro ao buscar o produto:', error)
        res.status(500).send({ error: 'Erro ao buscar o produto'})
    }
}

async function getProductName(req, res) {
    const { name } = req.params

    try {
        const result = await productsModel.query(`SELECT * FROM products WHERE name = $1;`, [name])
        res.send(result.rows)
    } catch (error) {
        console.error('Erro ao buscar o produto pelo nome:', error)
        res.status(500).send({ error: 'Erro ao buscar o produto pelo nome'})
    }
    
}

async function getNameProducts(req, res) {
    const { name } = req.params

    try {
        const result = await productsModel.query(`SELECT * FROM products WHERE name ILIKE $1;` ,[`%${name}%`])
        res.send(result.rows)
    } catch (error) {
        console.error('Erro ao buscar os produtos:', error)
        res.status(500).send({ error: 'Erro ao buscar os produtos'})
    }
    
}
module.exports = {// Exporta os controladores para serem usados nas rotas
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    patchUpdateProduct,
    getProductId,
    getProductName,
    getNameProducts
}