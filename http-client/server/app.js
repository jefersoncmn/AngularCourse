const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./product.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//Usando 'app.use' a cada requisição recebida ele irá chamar os Middleware estabelecidos
//Middleware intercepta as respostas e requisições HTTP

mongoose.connect(
    'mongodb://localhost:27017/http_client',
    {useNewUrlParser: true});

var myLogger = function (req, res, next) {
    console.log(req.body);
    next();//Se quiser interceptar a resposta, tratar depois do Next. No caso de requisição é depois do next
}
app.use(myLogger);//a função 'myLogger()' vai ser usada como Middleware (entre o tratamento da requisição e o recebimento)

//app.get(rota, função a ser chamada)
app.get('/products', function(req, res) {
    Product.find().lean().exec(
        (err, prods) => {
            if (err)
                res.status(500).send(err);//Código HTTP pra erro
            else
                res.status(200).send(prods);//Código HTTP pra sucesso
        }
    );
});
//Envia erro
app.get('/productserr', function(req, res) {
    setTimeout(
        () => {
            res.status(500).send({  //Manda o erro e uma mensagem junto
                msg: "Error message from the server"
            });
        }, 2000); //vai esperar 2 segundo para mandar o erro
});

app.get('/productsdelay', function(req, res) {
    setTimeout( () => {
        Product.find().lean().exec(
            (err, prods) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.status(200).send(prods);
            }
        );
    }, 2000);
});

app.get('/products_ids', function(req, res) {
    Product.find().lean().exec(
        (err, prods) => {
            if (err)
                res.status(500).send(err);
            else
                res.status(200).send(prods.map(p=>p._id));//O map percorerrá todos os produtos e retornará os o id deles
        }
    );
});

//O ':id' pra aceitar entrada de valores que podem ser lidos e trabalhados na requisição
app.get('/products/name/:id', function(req, res) {
    const id = req.params.id; //Pego o id escrito na requisição
    Product.findById(id,  //Procurará o item pelo id
        (err, prod) => {
            if (err)
                res.status(500).send(err);
            else if (!prod) //Se não encontrar nada 
                res.status(404).send({}); //Erro 404 é quando não foi encontrado
            else
                res.status(200).send(prod.name);
        }
    );
});

app.post('/products', function (req, res) {
    p = new Product({
        name: req.body.name,//pegando os dados da requisição pelo body
        price: req.body.price,
        department: req.body.price
    });
    p.save((err, prod) => { //Salva no banco
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send(prod);//Depois de salvo com exito, ele poderá enviar o produto, com um ID
    });
});

app.delete('/products/:id', function (req, res) {
    Product.deleteOne({_id: req.params.id},  //Deleta o produto do respectivo ID
        (err) => {
            if(err)
                res.status(500).send(err);
            else
                res.status(200).send({});
        })
});

//Patch será pra editar algum dado
//Com base no id enviado
app.patch('/products/:id', function (req, res) {

    Product.findById(req.params.id, (err, prod) => { //Procurará o item com base no id
        if (err)
            res.status(500).send(err);
        else if (!prod) //Se não tiver o produto
            res.status(404).send({}); 
        else {//Se encontrou o produto
            prod.name = req.body.name;//Mudará os valores do produto achado bom base no que foi alterado pelo usuário. Pegando os dados do body.
            prod.price = req.body.price;
            prod.department = req.body.department;
            prod.save((err, prod) => {
                if (err)
                    res.status(500).send(err);//Sempre bom verificar se pode dar erro, como não conseguir se comunicar com o banco de dados
                else
                    res.status(200).send(prod);
            });
        }    
    });


})

app.listen(3000);


















