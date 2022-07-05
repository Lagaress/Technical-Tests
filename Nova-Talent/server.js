const http = require('http');
const { resourceUsage } = require('process');
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

    else if (req.url.match(/\/nomination-list\/([admin,user])/) && req.method == 'GET')
    {
        const parameter = req.url.split('/')[2]
        if (parameter == 'admin')
        {
            showNominationList(req , res)
        }
        else
        {
            res.end("You have to be an admin to see nomination list")
        }
    }

    else
    {
        res.end("API instructions") 
        showInstructions(req , res)
    }
}