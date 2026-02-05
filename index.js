require("dotenv").config();
const express = require("express");// Importa o framework Express
const database = require("./src/config/database");

const app = express();// Cria uma instância do aplicativo Express
const port = 4505;// Define a porta onde o servidor irá rodar

app.use(express.json()) // Middleware para interpretar JSON no body das requisições


app.get("/products", async (req, res) => {// Rota para obter todos os produtos
    const result = await database.query(`SELECT * FROM products ORDER BY id DESC;`)// Consulta para selecionar todos os produtos ordenados por ID decrescente
    res.send(result.rows)// Envia os dados dos produtos como resposta
})

app.post("/products", async (req, res) => {// Rota para criar um novo produto
    const { name, price, category_id } = req.body// Extrai os dados do corpo da requisição
    const result = await database.query(`INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *;`, [name, price, category_id])// Consulta para inserir um novo produto e retornar o produto criado
    res.send(result.rows[0])// Envia o produto criado como resposta
})

app.delete("/products/:id", async (req, res) => {
    const { id } = req.params
    const result = await database.query(`DELETE FROM products WHERE id = $1 RETURNING*;`, [id])
    res.send(result.rows[0])
})

app.put("/products/:id", async (req, res) => {
    const { id } = req.params
    const { name, price, category_id} = req.body
    const result = await database.query(`UPDATE products SET name = $1, price = $2, category_id = $3 WHERE id = $4 RETURNING *;`, [name, price, category_id, id])
    res.send(result.rows[0])
})

app.patch("/products/price/:id", async (req, res) => {
    const { id } = req.params
    const { price } = req.body
    const result = await database.query(`UPDATE products SET price = $1 WHERE id = $2 RETURNING *;`, [price, id])
    res.send(result.rows[0])
})

app.get("/products/:id", async (req, res) => {
    const { id } = req.params
    const result = await database.query(`SELECT * FROM products WHERE id = $1;`, [id])
    res.send(result.rows)
})

app.get("/products/name/:name", async (req,res) =>{
    const { name } = req.params
    const result = await database.query(`SELECT * FROM products WHERE name = $1;`, [name])
    res.send(result.rows)
})

app.get("/products/name//:name", async (req,res) =>{
    const { name } = req.params
    const result = await database.query(`SELECT * FROM products WHERE name ILIKE $1;` ,[`%${name}%`])
    res.send(result.rows)
})

app.listen(port, () => {// Inicia o servidor na porta especificada
    console.log(`Servidor rodando na porta ${port}`)// Loga uma mensagem quando o servidor estiver rodando
})