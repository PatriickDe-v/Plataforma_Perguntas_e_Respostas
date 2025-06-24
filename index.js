const express = require("express") //importando o modulo express 
const app = express()              //criando uma copia do express

//Estou dizendo para o Express usar o EJS como view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

//rota padrao, home 
app.get("/", (req, res) => {
    res.render("index")
})
//rota perguntar
app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

app.listen(8080, () => {
    console.log("App rodando")
})