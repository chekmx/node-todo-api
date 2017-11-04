const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id ='69fccec9f27103b026d21fbc';

User.findById(id).then((user) =>{
    if(!user)
    {
        return console.log('User not found');
    }
    console.log(user);   
}).catch((e) => console.log(e));

// var id = '59fde6670c9ad9001bb914b4';

// if(!ObjectID.isValid(id))
// {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) =>{
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) =>{
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) =>{
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo', todo);
// }).catch((e) => console.log(e));