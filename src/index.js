const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = 3000;

const users = [
    {userId: 1, name: 'Joe'},
    {userId: 2, name: 'James'},
    {userId: 3, name: 'Anna'},
];

const messages = [
    {userId: 1, messageId: 1, message: 'Lorem'},
    {userId: 1, messageId: 2, message: 'Ipsum'},
    {userId: 1, messageId: 3, message: 'Solor'},
    {userId: 2, messageId: 4, message: 'It'},
    {userId: 2, messageId: 5, message: 'Damet'}
];

app.get('/', (req, res) => res.send('Hello World!'));

// GET on resource collection
// curl localhost:3000/api/users
app.get('/api/users', (req, res) => res.json(users));

// POST for creating a member resource (new user)
// curl -X POST localhost:3000/api/users -d '{"name":"Lucas"}' -H "Content-Type: application/json"
app.post('/api/users', (req, res) => {
    const newUser = {
        userId: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    return res.json(newUser)
});

// GET on specific member resource for details
// curl localhost:3000/api/users/1
app.get('/api/users/:userId', (req, res) => {
    return res.json(users.find(u => u.userId === +req.params.userId))
});

// PUT Replace our member resource
// curl -X PUT localhost:3000/api/users/1 -d '{"name":"UpdateUser"}' -H "Content-Type: application/json"
// curl -X PUT localhost:3000/api/users/10 -d '{"name":"MyNewUser"}' -H "Content-Type: application/json"
app.put('/api/users/:userId', (req, res) => {
    let userIdx = users.findIndex(u => u.userId === +req.params.userId);
    if (userIdx === -1) {
        // If requested element does not exist, PUT will create a new member
        users.push({
            userId: users.length +1,
            ...req.body,
        })
    }
    users[userIdx] = {
        ...users[userIdx],
        ...req.body
    };
    return res.json(users[userIdx])
});

// PATCH Update our member resource
// curl -X PATCH localhost:3000/api/users/1 -d '{"newProp":"hellothere"}' -H "Content-Type: application/json"
app.patch('/api/users/:userId', (req, res) => {
    let userIdx = users.findIndex(u => u.userId === +req.params.userId);
    if (userIdx === -1) {
        // If requested element does not exist, PATCH may be used to create a new resource
        // This is not mandatory, but REST allows us that.
    }
    users[userIdx] = {
        ...users[userIdx],
        ...req.body
    };
    return res.json(users[userIdx])
});

// GET collection of a member resource
// curl localhost:3000/api/users/1/messages
app.get('/api/users/:userId/messages', (req, res) => {
    return res.json(messages.filter(m => m.userId === +req.params.userId))
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));