var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("Welcome to the Nova Talent API\n");
});

server.listen(8000, function() {
    console.log('Server is running at 8000')
});