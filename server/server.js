var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
    text: {
        type: String
    },
    completed:{
        type: Boolean
    },
    completedAt:{
        type: Number
    }
});

// var newTodo = new Todo({
//     text: 'Cook diner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save Todo.');
// });

var newTodo = new Todo({
    text: 'Eat Diner',
    completed: true,
    completedAt: 0
});

newTodo.save().then((doc) => {
    console.log(doc);
}, (e) => {
    console.log('Unable to save todo');
});