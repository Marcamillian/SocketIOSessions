`use strict`;

const session = require('express-session');
const sharedSession = require('express-socket.io-session');
const express = require('express');
const http = require('http');
const io = require('socket.io');


var app;
var sessionParser;
var server;
var wss;


// create session handler
sessionParser = session({
    secret: 'passOpen',
    resave: true,
    saveUninitialized: true,
})

// create express app
app = express();
// configure express app
app.set('port', (process.env.PORT || 8080) );
app.use(express.static('./src/client'));
app.use(sessionParser);

app.post('/login', (req, res)=>{
    res.send({result:"OK", message: 'session set up'})
})

// create the http server
server = http.createServer(app);

// create websocket server
wss = io(server);
// add the session middleware to the websocket server
wss.use(sharedSession(sessionParser, {autoSave:true}));


// configure websocket server
wss.on('connection', (ws)=>{
    console.log("connection requested")

    if(!ws.handshake.session.userId){ // if not aready had a session
        ws.handshake.session.userId = "someId"
        ws.handshake.session.save();
        ws.emit("first_visit");
        console.log("first time visitor")
    }else{ // use already has a session
        console.log(ws.handshake.session.userId)
        ws.emit("return_visit");
        console.log("returning visitor")
    }
    
    ws.on('something', (socket)=>{
        console.log("Some socket is doing something")
    })
})


server.listen(app.get("port"), ()=>{console.log(`Listening on port ${app.get('port')}`)});

