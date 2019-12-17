const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = 3000;

const article = {
    id: 1,
    title: 'My Article',
    isPublished: false,
};

const users = [
    {userId: 1, name: 'Joe'},
    {userId: 2, name: 'James'},
    {userId: 3, name: 'Anna'},
];

app.get('/articles/', (req, res) => {
    // Don't send plaintext JSON!
    // Make sure you return the proper media type!
    return res.send(JSON.stringify(article))
});

/* ...
*  GET calls should NOT modify data!*/
app.get('/articles/:articleId/publish', (req, res) => {
    article.isPublished = true;
    return res.json(article)
});

// Using POST for both creating and updating
app.post('/articles/1', (req, res) => {});

// Unnecessary endpoints for CRUD, just stick to HTTP methods.
app.post('/articles/create', (req, res) => {});
app.get('/articles/list', (req, res) => {});
app.put('/articles/:articleId/edit', (req, res) => {});
app.delete('/articles/:articleId/delete', (req, res) => {});
app.get('/articles/:articleId/get', (req, res) => {});

// Use HTTP codes! Not custom errors!
// Replying with a 200 OK response and then informing in the body there's an error is terrible!
app.get('/some/resource', (req, res) => {
    try {
        return undefinedCallThatWillThrow() // or validation errors
    } catch (e) {
        return res.json({error_code: 7})
    }
});

// Using POST as GET with filtering
app.post('/users/', (req, res) => {
    // apply some filter condition based on req.body
    const users = users.filter(u => u)
    return res.json(users)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));