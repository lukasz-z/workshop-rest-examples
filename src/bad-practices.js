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

/* ...
*  GET calls should NOT modify data!*/
app.get('/article/:articleId/publish', (req, res) => {
    article.isPublished = true;
    return res.json(article)
});

// Unnecessary endpoints for CRUD
app.post('/article/create', (req, res) => {});
app.get('/article/list', (req, res) => {});
app.put('/article/:articleId/edit', (req, res) => {});
app.delete('/article/:articleId/delete', (req, res) => {});
app.get('/article/:articleId/get', (req, res) => {});

app.get('/some/resource', (req, res) => {
    try {
        return undefinedCallThatWillThrow()
    } catch (e) {
        return res.json({error_code: 7})
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));