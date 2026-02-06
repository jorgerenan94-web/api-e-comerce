require("dotenv").config();
const express = require("express");// Importa o framework Express
const database = require("./src/config/database");
const routesProducts = require("./src/routes/products");

const app = express();// Cria uma instância do aplicativo Express
const port = 4505;// Define a porta onde o servidor irá rodar

app.use(express.json()) // Middleware para interpretar JSON no body das requisições

app.use("/", routesProducts)// Usa as rotas definidas no arquivo routes/products.js


app.patch("/products/price/:id", async (req, res) => {
    const { id } = req.params
    const { price } = req.body

    if(!id || !price){
        return res.status(400).send({ error: "Preço e id são obrigatórios."})
    }

    try {
        const result = await database.query(`UPDATE products SET price = $1 WHERE id = $2 RETURNING *;`, [price, id])
        res.status(200).send(result.rows[0])
    } catch (error) {
        console.error('Erro ao atualizar o preço do produto:', error)
        res.status(500).send({ error: 'Erro ao atualizar o preço do produto'})
    }

})

app.get("/products/:id", async (req, res) => {
    const { id } = req.params
    
    if(!id){
        return res.status(400).send({ error: "O id é obrigatório."})
    }

    try {
        const result = await database.query(`SELECT * FROM products WHERE id = $1;`, [id])
        res.send(result.rows)
    } catch (error) {
        console.error('Erro ao buscar o produto:', error)
        res.status(500).send({ error: 'Erro ao buscar o produto'})
    }
    
})

app.get("/products/name/:name", async (req,res) =>{
    const { name } = req.params

     if(!name){
        return res.status(400).send({ error: "O nome é obrigatório."})
    }

    try {
        const result = await database.query(`SELECT * FROM products WHERE name = $1;`, [name])
        res.send(result.rows)
    } catch (error) {
        console.error('Erro ao buscar o produto pelo nome:', error)
        res.status(500).send({ error: 'Erro ao buscar o produto pelo nome'})
    }
    
})

app.get("/products/name//:name", async (req,res) =>{
    const { name } = req.params

    try {
        const result = await database.query(`SELECT * FROM products WHERE name ILIKE $1;` ,[`%${name}%`])
        res.send(result.rows)
    } catch (error) {
        console.error('Erro ao buscar os produtos:', error)
        res.status(500).send({ error: 'Erro ao buscar os produtos'})
    }
    
})

app.listen(port, () => {// Inicia o servidor na porta especificada
    console.log(`Servidor rodando na porta ${port}`)// Loga uma mensagem quando o servidor estiver rodando
})