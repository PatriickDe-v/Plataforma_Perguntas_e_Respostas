const Sequelize = require('sequelize')

const connection = new Sequelize('perguntas_e_respostas','root', '123123', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection