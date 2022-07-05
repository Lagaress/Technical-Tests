var NominationModel = require('../models/nominationModel')

function addNomination(req, res, Nomination)
{
    try
    {
        console.log(Nomination)
    }
    catch (err)
    {
        console.log(err)
    }
}

async function showNominationList(req , res)
{
    try
    {
        var nominationList = await NominationModel.getNominationsNonRejected()
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