var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//data generation
let generate_random_data = () => {
    return Array(30).fill().map((e,i)=>{return {"date": new Date(2019, 10, i), "temp": 15 + (Math.random() * 10)}});
};
let temperatures = {};
let connections = {};
for (let room of ["bedroom", "office", "kitchen", "bathroom"]){
    temperatures[room] = generate_random_data();
    connections[room] = [];
}

//handle routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Temperature' });
});

app.get('/temperatures', (req, res) => {
    res.json(temperatures);
});

app.get('/rooms', (req, res) => {
    res.json(Object.keys(temperatures));
});

app.get('/temperatures/:kamer', (req, res) => {
    res.json(temperatures[req.params.kamer]);
});

app.post('/temperatures/:kamer', (req, res) => {
    let newData = {
        "date": new Date(),
        "temp": parseInt(req.body.temp)
    };
    temperatures[req.params.kamer].push(newData);
    res.status(202);
    res.end();
    for(let conn of connections[req.params.kamer]) {
        conn.send(JSON.stringify([newData]));
    }
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
    let room = req.url.split("=")[1];
    if( !Object.keys(temperatures).includes(room)) {
        ws.destroy();
    }
    ws.send(JSON.stringify(temperatures[room]));
    connections[room].push(ws);
});

module.exports = app;
