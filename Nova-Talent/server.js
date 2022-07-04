const http = require('http')
const {addNomination , showNominationList , showInstructions} = require('./controllers/nominationController')
const server = http.createServer(function(req, res) {
    res.writeHead(200, { "Content-type": "text/plain" })
    manageURLs(req , res) ;
})

server.listen(8000, function() {
    console.log('Server is running at 8000')
})

function manageURLs(req , res)
{
    if (req.url == '/nominate' && req.method == 'POST')
    {
        res.end("Now you can nominate") 
        addNomination(req , res)
    }

    else if (req.url == '/nominations-list' && req.method == 'GET')
    {
        res.end("Here is where you're going to see all nominations") 
        showNominationList(req , res)
    }

    else
    {
        res.end("API instructions") 
        showInstructions(req , res)
    }
}