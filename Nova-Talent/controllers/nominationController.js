const NominationModel = require('../models/nominationModel')
const {dashLogger} = require('../documentation/logs/logger')

async function addNomination(req, res, Nomination)
{
    try
    {
        const isAddingNominationPossibly = await NominationModel.addNominationToDb(Nomination)
        res.writeHead(201 , {'Content-Type': 'application/json'})
        res.write(distinguishNominationCases(isAddingNominationPossibly))
        res.end()
    }
    catch (err)
    {
        registerError(req, err)    
    }

}

function distinguishNominationCases(isAddingNominationPossibly)
{
    if (isAddingNominationPossibly)
    {
        return "Nomination added successfully"
    }
    else
    {
        return "The user that you're trying to add is already on database"
    }
}

async function showNominationList(req, res)
{
    try
    {
        const nominationList = await NominationModel.getNominationsNonRejected()
        res.writeHead(200 , {'Content-Type': 'application/json'})
        res.write(distinguishEmptyListCases(nominationList))
        res.end()
    }
    catch (err)
    {
       registerError(req, err)
    }
}

function distinguishEmptyListCases(nominationList)
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

function showInstructions(res)
{
    res.writeHead(200 , {'Content-Type': 'text/plain'})
    res.write
    (
        "The endpoints of the API are:\n[POST] /nominate/{userWhoNominate}/{userToNominate}/{explanation}/{involvement}/{overall}/\n[GET] /nomination-list/{user}\nAll parameters are obligatory\nFor more information check API documentation on the documentation folder"
    )
    res.end()
}

function registerError (req, err)
{
    console.log("An error has been produced, more information on /documentation/logs/")
    dashLogger.error(`Error: ${err} , Request: ${req.url}`)
}

function createDatabase()
{
    try
    {
        NominationModel.createDatabaseIfNotExist()
    }
    catch (err)
    {
        console.log("An error has been produced creating database, more information on /documentation/logs/")
        dashLogger.error(`Error: ${err}`)  
    }
}

module.exports = 
{
    addNomination,
    showNominationList,
    showInstructions,
    createDatabase
    
}