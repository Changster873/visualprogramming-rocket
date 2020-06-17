// import of modules
var express = require('express');

// creating an express app

var app = express();

// root of the app
app.get("/", (req, res) => {
    console.log('root of the app reached...');
})

// start up a server and listen on port 5000
app.listen(5000, (req, res) => {
    console.log('Listening on port 5000...');
});