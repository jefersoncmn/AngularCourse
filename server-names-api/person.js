const mongoose = require('mongoose'); //Pacote para uso do banco de dados Mongoose
const Schema = mongoose.Schema;//Criação de uma estrutura no banco

var personSchema = new Schema({
    firsname: String,
    lastname: String,
    email: String,
    city: String,
    country: String 
});

module.exports = mongoose.model("Person", personSchema);
