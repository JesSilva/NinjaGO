const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja_model');

//Método GET
//Retorna a lista de registros do banco de dados
router.get('/ninjas', function(req, res, next){
    
    //Retorna todos os registros
    /*
    Ninja.find({}).then(function(ninjas){
        res.send(ninjas)
    }).catch(next);
    */

    //Retorna todos os registros baseados na localização
    Ninja.aggregate().near({
        
        near: {
            'type' : 'Point',
            'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 100000,
        spherical: true,
        distanceField: "dis"

    }).then(function(ninjas){
        res.send(ninjas);
    });

});

//Método POST
//Adiciona um registro na base de dados
router.post('/ninjas', function(req, res, next){
    
    //Cria uma nova instancia local e salva os dados de forma simplificada
    //E retorna uma promise
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});

//Método PUT (update)
//Atualiza um registro na base de dados
router.put('/ninjas/:id', function(req, res, next){

    //Procura um registro na base de dados e o atualiza
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        
        //Obtém o registro atualizado de volta e o retorna
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        });

    }).catch(next);

});

//Método DELETE
//Remove um registro da base de dados
router.delete('/ninjas/:id', function(req, res, next){
    
    //Obtém o ID como parâmetro, pesquisa na base de dados, remove e retorna o objeto
    //encontrado.
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    }).catch(next); 
    
});


module.exports = router;