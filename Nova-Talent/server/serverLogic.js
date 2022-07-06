const {addNomination , showNominationList , showInstructions} = require('../controllers/nominationController')
const NominationClass = require('../data/Nomination')

function manageURLs(req , res)
{
    if (req.url.match(/\/nominate\/[A-Z]|[a-z]|[@.,*`^]\/[A-Z]|[a-z]|[@.,*`^]\/[A-Z]|[a-z]\/[1-10]\/[1-10]/) && req.method == 'POST')
    {
        nominateEndpoint(req, res)
    }

    else if (req.url.match(/\/nomination-list\/([A-Z])|[a-z]/) && req.method == 'GET')
    {
        nominationListEndpoint(req,res)
    }

    else
    {
        showInstructions(res)
    }
}

function nominateEndpoint(req, res)
{
    const nominate = req.url.split('/')[1]

    if (nominate == 'nominate')
    {
        distinguishMissingArguments(req, res)
    }

    else
    {
        showInstructions(res)
    }
}

function distinguishMissingArguments(req, res)
{
    const userWhoNominate = req.url.split('/')[2]
    const userToNominate = req.url.split('/')[3]
    const explanation = req.url.split('/')[4]
    const involvement = req.url.split('/')[5]
    const overall = req.url.split('/')[6]

    const dataArray = [userWhoNominate,userToNominate,explanation,involvement,overall]

    if (isAnyArgumentMissing(dataArray))
    {
        res.end("There is any parameter missing, please check API instructions")
    }

    else
    {   
        const explanation = req.url.split('/')[4]
        var regularExpresion = /%20/gi
        parserExplanation = explanation.replace(regularExpresion,' ')
        
        const newNomination = new NominationClass.Nomination(userWhoNominate,userToNominate,explanation,involvement,overall)        
        addNomination(res, newNomination)    
    }
}

function isAnyArgumentMissing(dataArray)
{

    return dataArray.includes(undefined)
}

function nominationListEndpoint(req,res)
{
    const nominationList = req.url.split('/')[1]
    if (nominationList == 'nomination-list')
    {
        distinguishAdmin(req, res)
    }
    else
    {
        showInstructions(res)
    }
}

function distinguishAdmin(req, res)
{
    const parameter = req.url.split('/')[2]

    if (parameter == 'admin')
    {
        showNominationList(res)
    }
    else
    {
        res.end("You have to be an admin to see nomination list")
    }
}

module.exports = 
{
    manageURLs
}