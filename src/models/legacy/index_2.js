const sequelize = require("../../config/sequelize");
const Categories = require("./categories_2");
const Products = require("./products_2");

sequelize.sync()
    .then(() => console.log('Models sincronizados com sucesso!'))
    .catch((err) => console.error('Erro ao sincronizar models:',err));

module.exports = {
    Categories,
    Products
};