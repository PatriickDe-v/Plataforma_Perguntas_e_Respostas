const Sequelize = require('sequelize')
const connection = require('./database')

const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNul: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNul: false
    }
})

//Sincronizar com os bancos de dados ^ 
Pergunta.sync({force: false}).then(() => {}) //não vai recriar a tabela no banco de dados caso ja exista
