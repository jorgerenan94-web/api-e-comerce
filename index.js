const express = require("express");// Importa o framework Express
const database = require("./src/config/database");
require("dotenv").config();

const app = express();// Cria uma instância do aplicativo Express
const port = 4505;// Define a porta onde o servidor irá rodar

const db = []// Simula um banco de dados com um array

app.use(express.json()) // Middleware para interpretar JSON no body das requisições

app.get("/", (req, res) => {// Rota raiz
    res.send("Olá Jorge Renan!")// Envia uma resposta simples
})

app.post("/products", (req, res) => {// Rota para criar produtos
    const name = req.body.name;// Extrai o nome do produto do corpo da requisição
    const { price, category } = req.body;// Extrai o preço e a categoria do corpo da requisição
    
    if(!name || !price || !category){
        return res.status(400).send("Preencha todos os campos!")
    }

    db.push({// Adiciona o novo produto ao "banco de dados" (array)
        name,
        category,
        price
    })

    res.status(201).send("Produto criado com sucesso!")// Envia uma resposta de sucesso
})

app.get("/products", (req, res) => {
    res.send(db)// Envia a lista de produtos armazenados no "banco de dados"
})

app.listen(port, () => {// Inicia o servidor na porta especificada
    console.log(`Servidor rodando na porta ${port}`)// Loga uma mensagem quando o servidor estiver rodando
})