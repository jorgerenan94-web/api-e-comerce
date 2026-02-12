require("dotenv").config();
const express = require("express");// Importa o framework Express
const routesProducts = require("./src/routes/products");
require("./src/models");

const app = express();// Cria uma instância do aplicativo Express
const port = 4505;// Define a porta onde o servidor irá rodar

app.use(express.json()) // Middleware para interpretar JSON no body das requisições

app.use("/", routesProducts)// Usa as rotas definidas no arquivo routes/products.js

app.listen(port, () => {// Inicia o servidor na porta especificada
    console.log(`Servidor rodando na porta ${port}`)// Loga uma mensagem quando o servidor estiver rodando
})