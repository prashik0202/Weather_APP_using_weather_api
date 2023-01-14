const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const request = require('request');
const path = require('path');

//making express app:
const app = express();

const port = process.env.PORT;
const api_key = process.env.API_KEY;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.render('index');
})

app.listen(port,() => {
    console.log(`Server is started on : http://localhost:${port}`);
});