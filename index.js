const express = require("express") //importando o modulo express 
const app = express()              //criando uma copia do express
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/pergunta")

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
    //igual ao SELECT * FROM
    Pergunta.findAll({
        raw: true, order: [
            ['id', 'DESC']  //Ordenar as perguntas da forma DECRESCENTE. 
        ]
    }).then(perguntas => {   //'raw: true', trás apenas as inf cruas
        res.render("index", {
            perguntas: perguntas
        })
    })
})

//rota perguntar
app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

//rota para receber os dados do formulario
app.post("/salvarpergunta", (req, res) => {

    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    Pergunta.create({                   //equivalente ao INSERT INTO
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })
})

//buscando perguntas pelo id
app.get("/pergunta/:id", (req, res) => {
    let id = req.params.id

    Pergunta.findOne({
        where: { id: id }

    }).then(pergunta => {
        if (pergunta != undefined) {      //pergunta foi encontrada
            res.render("pergunta", {
                pergunta: pergunta
            })
        } else {                            //pergunta vai ser nula (não encontrada)
            res.redirect("/")
        }
    })

})


app.listen(8080, () => {
    console.log("App rodando")
})