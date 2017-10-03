var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 

// inclure du css
app.use(express.static(__dirname + '/assets'));


app.get('/', function(req, res, next) {  
    res.sendFile(__dirname + '/index.html');
});


// on charge socket.io
var io = require ('socket.io').listen(server);

// compter les clients connectés
var client = 0;

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    client += 1;
    // on emet un évènement 'welcome'
    socket.broadcast.emit('welcome', 'Un autre client est connecté');
    if(client <= 1) {
        console.log(client+' client connecté !');
    } else {
        console.log(client+' clients connectés !');
    }
});


// écoute sur le port 5000
server.listen(5000);
console.log('Server running at http://127.0.0.1:5000/');
