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

async function showNominationList(res)
{
    try
    {
        var nominationList = await NominationModel.getNominationsNonRejected()
        res.writeHead(200 , {'Content-Type': 'application/json'})
        res.write(distinguishEmptyList(nominationList))
        res.end()
    }
    catch (err)
    {
        //TODO: ESCRIBIR EN EL ARCHIVO DE LOGS
        console.log(err)
    }
}

function distinguishEmptyList(nominationList)
{
    if (nominationList == [])
    {
        return "The list is empty"
    }
    else
    {
        return JSON.stringify(nominationList)
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