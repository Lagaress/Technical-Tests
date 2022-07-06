const http = require('http');
const serverConfig = require('./config.json')
const {manageURLs , startDatabase} = require('./serverLogic')

const server = http.createServer(function(req, res) {
    res.writeHead(200, { "Content-type": "text/plain" })
    startDatabase()
    manageURLs(req, res)
})

server.listen(serverConfig.port, function() {
    console.log(`Server is running at ${serverConfig.port}`)
})

