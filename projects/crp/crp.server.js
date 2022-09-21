const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

const CSS_WAIT_TIME = 5000;
const JS_WAIT_TIME = 1000;

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'));
});

app.get('/crp.app.js', (req, res) => {
    wait(JS_WAIT_TIME, () => {
        res.sendFile(path.resolve(__dirname, './crp.app.js'));
    });
});

app.get('/crp.css', (req, res) => {
    console.log('crp.css called')
    wait(CSS_WAIT_TIME, () => {
        res.sendFile(path.resolve(__dirname, './crp.css'));
    });
});

const wait = (timeout, fn) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(fn());
        }, timeout)
    });
};

app.listen(2000, (err) => {
    if (err) {
        console.log('Error caught on starting node server: ' + err.message);
    }
    console.log('Started node server at http://localhost:3000');
});