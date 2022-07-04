var Nomination = require('../models/nominationModel')

function addNomination(req, res)
{

}

async function showNominationList(req , res)
{
    try
    {
        var nominationList = await Nomination.getNominationsNonRejected()
        res.writeHead(200 , {'Content-Type': 'application/json'})
        res.write(JSON.stringify(nominationList));
        res.end()
    }
    catch (err)
    {
        console.log(err)
    }
}

function showInstructions(req, res)
{

}

module.exports = 
{
    addNomination,
    showNominationList,
    showInstructions
}