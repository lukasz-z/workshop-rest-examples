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

app.get('/', (req, res) => res.send('Hello World!'));

// GET on resource group for listing data
// curl localhost:3000/users
app.get('/users', (req, res) => res.json(users));

// POST for creating a new user
// curl -X POST localhost:3000/users -d '{"name":"Lucas"}' -H "Content-Type: application/json"
app.post('/users', (req, res) => {
    const newUser = {
        userId: users.length +1,
        name: req.body.name
    };
    users.push(newUser);
    return res.json(newUser)
});

// GET on specific resource for details
app.get('/users/:userId', (req, res) => {
    return res.json(users.find(u => u.userId === +req.params.userId))
});

// Update our member resource
app.patch('/users/:userId', (req, res) => res.send([]));

app.get('/users/:userId/messages', (req, res) => res.send([]));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));