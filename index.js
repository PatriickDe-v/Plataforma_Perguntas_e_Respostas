const express = require("express") //importando o modulo express 
const app = express()              //criando uma copia do express
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/pergunta")
const Resposta = require("./database/resposta")

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
        raw: true, order: [ //'raw: true', trás apenas as inf cruas
            ['id', 'DESC']  //Ordenar as perguntas da forma DECRESCENTE. 
        ]
    }).then(perguntas => {
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
        if (pergunta != undefined) {

            //pesquisando respostas que tenham o id igual ao id da pergunta
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                //pergunta foi encontrada
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
        } else {                            //pergunta vai ser nula (não encontrada)
            res.redirect("/")
        }
    })

})

//vai receber os dados do formulário resposta
app.post("/responder", (req, res) => {
    //pegando os dados dos campos do formulário
    let corpo = req.body.corpo
    let perguntaId = req.body.pergunta

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId)
    })

})

app.listen(8080, () => {
    console.log("App rodando")
})