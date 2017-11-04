const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //deleteMany
    // db.collection('Todos').deleteMany({ text: 'Eat lunch'}).then((result) =>{
    //     console.log(result);
    // });
    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result)=>{
    //     console.log(result);
    // });
    //findOneAndDelete
    
    // db.collection('Todos').findOneAndDelete({ completed: false}).then((result) => {
    //     console.log(result);
    // })

    db.collection('Users').findOneAndDelete({ _id: new ObjectID('59fa085293be40b11d1ec790')}).then((result) =>{
        console.log(result);
    })

    db.collection('Users').deleteMany({ name: 'Stephen'}).then((result) => {
        console.log(result);
    });
    db.close();
});