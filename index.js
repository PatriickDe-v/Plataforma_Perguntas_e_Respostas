const express = require("express") //importando o modulo express 
const app = express()              //criando uma copia do express
const bodyParser = require("body-parser")
const connection = require("./database/database")
const pergunta = require("./database/pergunta")

//DataBase
connection
    .authenticate()                 //tentando conectar com o banco de dados
    .then(() => {
        console.log("Conexão feita com o banco de dados!")      //se conseguir, envia esse console.log
    })
    .catch((msgErro) => {
        console.log(msgErro)                    //caso der erro, envia esse console.log
    })


//Estou dizendo para o Express usar o EJS como view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

//body parser
//configurando body-parser
app.use(bodyParser.urlencoded({ extended: false }))  //bodyparser vai traduzir os dados do formulario para js
app.use(bodyParser.json())                  //permite ler dados via json

//Rotas
//rota padrao, home 
app.get("/", (req, res) => {
    res.render("index")
})
//rota perguntar
app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

//rota para receber os dados do formulario
app.post("/salvarpergunta", (req, res) => {

})


app.listen(8080, () => {
    console.log("App rodando")
})