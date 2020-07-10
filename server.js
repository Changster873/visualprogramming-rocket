// Modules import
const express = require('express');
const path = require('path');

// Express App
var app = express()

// Port number (for production, value of 5000 is replaced)
const port = process.env.PORT || 5000;

// Production Settings
if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname = 'client/build/index.html'))
    })
}
// Testing Settings
else {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/public/index.html'))
    })
}

app.get('/', (req, res) => {
    res.send('root reached');
})

app.listen(port, (req, res) => {
    console.log(`Server running at ${port}`)
})
