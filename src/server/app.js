`use strict`;

const session = require('express-session');
const express = require('express');
const http = require('http');
const io = require('socket.io');


var app;
var sessionParser;
var server;
var wss;

// create session handler
sessionParser = session({
    saveUninitialized: false,
    secret: 'passOpen',
    resave: false
})

// create express app
app = express();
// configure express app
app.set('port', (process.env.PORT || 8080) );
app.use(express.static('./src/client'));
app.use(sessionParser);

// create the http server
server = http.createServer(app);

// create websocket server
wss = io(server);
// configure websocket server
wss.on('connection', (ws)=>{

})


server.listen(app.get("port"), ()=>{console.log(`Listening on port ${app.get('port')}`)});

