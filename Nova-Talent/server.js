const http = require('http');
const { resourceUsage } = require('process');
const {addNomination , showNominationList , showInstructions} = require('./controllers/nominationController')
const NominationClass = require('./data/Nomination')

const server = http.createServer(function(req, res) {
    res.writeHead(200, { "Content-type": "text/plain" })
    manageURLs(req, res)
})

server.listen(8000, function() {
    console.log('Server is running at 8000')
})

function manageURLs(req , res)
{
    // Añadir casos para la distinción del post porque da error
    if (req.url.match(/\/nominate\/[A-Z]|[a-z]|[@.,*`^]\/[A-Z]|[a-z]|[@.,*`^]\/[A-Z]|[a-z]\/[1-10]\/[1-10]/) && req.method == 'POST')
    {

        const userWhoNominate = req.url.split('/')[2]
        const userToNominate = req.url.split('/')[3]
        const explanation = req.url.split('/')[4]
        const involvement = req.url.split('/')[5]
        const overall = req.url.split('/')[6]

        var regularExpresion = /%20/gi
        parserExplanation = explanation.replace(regularExpresion,' ')
        
        const newNomination = new NominationClass.Nomination(userWhoNominate,userToNominate,explanation,involvement,overall)        
        addNomination(res, newNomination)
    }

    else if (req.url.match(/\/nomination-list\/([A-Z])|[a-z]/) && req.method == 'GET')
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