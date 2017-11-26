const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const{Todo} = require('./../models/todo');

const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();        
                }).catch((e) => done(e));
            })
    });

    it('should not create a new todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();        
            }).catch((e) => done(e));
        });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return the todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        
        var id = new ObjectID();

        request(app)
        .get(`/todos/${id.toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('should return a 404 for not object ids', (done) => {
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) =>{
        var hexId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) =>{
                expect(res.body.todo._id).toBe(hexId)
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.findById(hexId).then((todo) =>{
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 404 if not found', (done) =>{
        var id = new ObjectID();
        
        request(app)
            .delete(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is not valid found', (done) =>{
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var id = todos[0]._id.toHexString();
        var text = "change the text";
        request(app)
            .patch(`/todos/${id}`)
            .send({text: text, completed: true})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completed).toBe(true)
                expect(res.body.todo.text).toBe(text)
            })
            .end((err, res) =>{
                if(err)
                {
                    return done(err);
                }
                Todo.findById(id).then((todo) => {
                    expect(todo.text).toBe(text);
                    expect(todo.completed).toBe(true);
                    expect(todo.completedAt).toBeA('number');
                    done();
                }).catch((e) => done(e));
            })
    });

    it('should clear completeAt when todo is not completed', (done) =>{
        var id = todos[1]._id.toHexString();
        var text = "change the text";
        request(app)
            .patch(`/todos/${id}`)
            .send({text: text, completed: false})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completed).toBe(false)
                expect(res.body.todo.text).toBe(text)
            })
            .end((err, res) =>{
                if(err)
                {
                    return done(err);
                }
                Todo.findById(id).then((todo) => {
                    expect(todo.text).toBe(text);
                    expect(todo.completed).toBe(false);
                    expect(todo.completedAt).toNotExist();
                    done();
                }).catch((e) => done(e));
            })
    })
})