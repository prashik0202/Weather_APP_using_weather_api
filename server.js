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
    res.render('index',{ weather : null , error : null });
})

//for handling the wronge address:
app.get('*',(req,res) => {
    return res.status(404).render('404');
})

app.post('/',(req,res) => {
    const city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

    request(url,(err,response,body) => {
        if(err){
            res.render('index',{ weather : null , error : 'Error, please try again'});
        }else{
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index', {weather : null , error : 'Error, please try again' });
            }else{
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}`;
                res.render('index',{ weather : weatherText , error : null });
            }
        }
    });
});

app.listen(port,() => {
    console.log(`Server is started on : http://localhost:${port}`);
});