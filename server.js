var http = require ('http');
var fs = require('fs');


var server = http.createServer(function(req, res) {
    console.log('Server started');
    fs.readFile('./index.html','utf-8', function(error, content) {
        if(error) {
            res.writeHead(404);
            throw error;
        } else {
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(content);
        }
    });
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