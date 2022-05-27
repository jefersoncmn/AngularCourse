const mongoose = require('mongoose');
const faker = require('faker');
const Person = require('./person.js');


mongoose.connect('mongodb://localhost:27017/namesdb', 
    { useNewUrlParser: true }  );//Connect do database


async function createRandomPeople() {
    const N = 1000;
    for(let i=0;i<N;i++) {
        let p = new Person({
            firstname: faker.name.firstName(),//Get generated data by Faker
            lastname: faker.name.lastName(), 
            email: faker.internet.email(),
            city: faker.address.city(),
            country:  faker.address.country()
        });
        try {
            await p.save();// 'p' will save object in the collection
        }
        catch(err) {
            throw new Error('Error generating new person');
        }
    }
}

createRandomPeople().then(()=>{ //This is Promisse
    mongoose.disconnect(); //Before the createRandomPeople function run, it's will disconect to the database
    console.log("OK");
})

