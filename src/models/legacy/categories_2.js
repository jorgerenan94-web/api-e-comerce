const sequelize = require("../../config/sequelize");// Importa a instância do Sequelize configurada para conectar ao banco de dados
const { DataTypes } = require("sequelize");// Importa o objeto DataTypes do Sequelize para definir os tipos de dados dos campos

const categories = sequelize.define("categories",{// Define o modelo de dados para a tabela categories
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,// Define o campo id como chave primária
        autoIncrement: true// Define o campo id como chave primária e auto-incrementável
    },
    name: {
        type: DataTypes.STRING, // Define o tipo de dado como string
        allowNull: false // Define que o campo name é obrigatório
    }
}, {
    timestamps: false // Desativa os campos createdAt e updatedAt
})

module.exports = categories;// Exporta o modelo de categorias para ser usado em outras partes da aplicação