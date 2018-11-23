const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Set up mongoose connection
const mongoose = require('mongoose');

let dev_db_url = 'mongodb://someuser:user123@ds123946.mlab.com:23946/productsample';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

var originsWhitelist = [
    'http://localhost:4200',      //this is my front-end url for development
   // 'http://www.myproductionurl.com'
];

var corsOptions = {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:true
  }

  //here is the magic
app.use(cors(corsOptions));

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

const product  = require('./routes/product.route');
const device = require('./routes/device.route');

// initialize our express app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use('/', (req,res) => {
//     res.send("this is data");
// });
app.use('/products', product);
app.use('/devices', device);


// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// const hostname = '127.0.0.1';
// let port = 5000;
let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port`+port);
});

// const server = http.createServer((req,res) => {
//     res.statusCode = '200';
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World\n');
// });


// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

module.exports = app;