var NominationModel = require('../models/nominationModel')

async function addNomination(res, Nomination)
{
    try
    {
        var flag = await NominationModel.addNominationToDb(Nomination)
        res.writeHead(201 , {'Content-Type': 'application/json'})
        if (flag)
        {
            res.write("Nomination added successfully");
        }
        else
        {
            res.write("The user that you're trying to add is already on database");
        }
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