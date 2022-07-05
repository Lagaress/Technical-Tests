var NominationModel = require('../models/nominationModel')

async function addNomination(res, Nomination)
{
    try
    {
        await NominationModel.addNominationToDb(Nomination)
        res.writeHead(201 , {'Content-Type': 'application/json'})
        res.write("Nomination added successfully");
        res.end()
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