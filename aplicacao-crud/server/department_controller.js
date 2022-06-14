var express = require('express');
var router = express.Router();//Para uso de rotas
var Department = require('./department');
var Product = require('./product');

router.post('/', function(req, res) {
   let d = new Department({ name: req.body.name });//Cria o departamento com o nome recebido na request
   d.save((err, dep) => { //Salva no banco de dados
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(dep);
   })
})

router.get('/', function(req, res) {
    Department.find().exec((err, deps) => { //Retorna todos departamentos cadastrados pro cliente
         if (err)
             res.status(500).send(err);
         else
             res.status(200).send(deps);
    })
})

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let prods = await Product.find({departments: id}).exec();
        if (prods.length > 0) {
            res.status(500).send({
                msg: 'Could not remove this department. You may have to fix its dependencies before.'
            })
        }
        else {
            await Department.deleteOne({_id: id});
            res.status(200).send({});//O send({}) envia um JSON vazio
        }
    }
    catch(err) {
        res.status(500).send({msg: "Internal error.", error: err})
    }
})

router.patch('/:id', (req, res) => {
    Department.findById(req.params.id, (err, dep) => {
        if (err)
            res.status(500).send(err);
        else if (!dep) //se não encontrou o dep
            res.status(404).send({});
        else {
            dep.name = req.body.name;
            dep.save()
                .then((d) => res.status(200).send(d))
                .catch((e) => res.status(500).send(e));
        }
    })
})

module.exports = router;