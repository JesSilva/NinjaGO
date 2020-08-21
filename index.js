const express = require('express');
const bodyParser = require('body-parser');

//Constrói a aplicação com o express
const app = express();

//Importa o front-end
app.use(express.static('public'));

//Configura a aplicação para trabalhar com o body-parser aceitar apenas dados em JSON
app.use(bodyParser.json());

//Importa e Utiliza as rotas
app.use('/api', require('./routes/api'));

//Controle de erros
app.use(function(err, req, res, next){

    res.status(422).send({ error: err.message });

});

//Configura a porta
app.listen(4000, function(){
    console.log("Listening to port 4000");
});