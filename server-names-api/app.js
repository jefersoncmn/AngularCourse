const mongoose = require('mongoose');
const Person = require('./person.js');
const bodyParser = require('body-parser');//Used to help receive HTTP requests
const cors =  require('cors');//Utilizado para usar em outro host
const express = require('express');
const app = express();//Send and Recieve HTTPs requests

//App.use permite interceptar as requests tanto na entrada quanto na saída
app.use(bodyParser.json());//Fará as requisições sejam interpretadas e respostas parseadas
app.use(bodyParser.urlencoded({extended: true}));//Facilita para interpretar atributos enviados via URL
app.use(cors());//Usa para fazer requisições de outro domínio

//Conecta do banco de dados
mongoose.connect('mongodb://localhost:27017/namesdb', { useNewUrlParser: true} );

app.get('/', (req, res) => { 
    //Procurará a Person e vai executar algo
    Person.find({}).lean().exec((err, data) => {
        if (err) { //Se retornar erro
            return res.status(500).json({ //Retorna o erro pro cliente
                error: err,
                message: 'Internal error.'
            });
        }
        return res.status(200).json(data); //Retorna o status e os dados
    }); 
})

//Se colocar qualquer coisa depois do '/'
app.get('/:text', (req, res) => { 

    let text = req.params.text;//Pega o texto escrito depois do '/'

    //Vai buscar no meio de todos os atributos alguém com a string do text
    var query = { $or: [
        { firstname: { $regex: text, $options: 'i' } },//procura algum fistname que seja igual ou contanha o text e retorna
        { lastname: { $regex: text, $options: 'i' } },
        { country: { $regex: text, $options: 'i' } },
        { email: { $regex: text, $options: 'i' } },
        { city: { $regex: text, $options: 'i' } },
    ]};

    Person.find(query).lean().exec((err, data) => {
        if (err) {
            return res.status(500).json({
                error: err,
                message: 'Internal error.'
            });
        }
        setTimeout(() => {
            return res.status(200).json(data)
        }, 2000);
    }); 
})


//Define para outras rotas que não existem um retorno
app.use(function(req, res, next) {
    res.status(404).send('Route does not exist.');
});

app.listen(9000);//Define a porta da aplicação
