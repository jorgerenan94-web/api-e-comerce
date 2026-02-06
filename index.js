require("dotenv").config();
const express = require("express");// Importa o framework Express
const database = require("./src/config/database");
const routesProducts = require("./src/routes/products");

const app = express();// Cria uma instância do aplicativo Express
const port = 4505;// Define a porta onde o servidor irá rodar

app.use(express.json()) // Middleware para interpretar JSON no body das requisições

app.use("/", routesProducts)// Usa as rotas definidas no arquivo routes/products.js

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