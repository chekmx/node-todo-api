const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //         text: 'Something to do.',
    //         completed: false

    // }, (err, results) => {
    //     if(err){
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(results.ops, undefined, 2))
    // });

    //Insert new doc into Users {name, age, location}
    // db.collection('Users').insertOne({
    //     name: 'Stephen',
    //     age: 48,
    //     location: 'Wetzikon'
    // }, (err, results) => {
    //     if(err){
    //         console.log('Unable to add user.')
    //     }

    //     console.log(JSON.stringify(results.ops, undefined, 2))
    // });

    db.close();
});