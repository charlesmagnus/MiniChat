var http = require ('http');

var server = http.createServer(function(req, res) {
    console.log('Server started');
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end('Bienvenue');
}).listen(5000);