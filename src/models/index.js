const sequelize = require("../../config/sequelize");
const Categories = require("./categories");
const Products = require("./products");

sequelize.sync()
    .then(() => console.log('Models sincronizados com sucesso!'))
    .catch((err) => console.error('Erro ao sincronizar models:',err));

module.exports = {
    Categories,
    Products
};