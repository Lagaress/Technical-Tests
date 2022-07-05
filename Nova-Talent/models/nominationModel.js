const {connection} = require('../data/database/connection')
const NominationClass = require('../data/Nomination')

function addNominationToDb(nominationToAdd)
{

    const userWhoNominate = nominationToAdd.getUserWhoNominate()
    const userToNominate = nominationToAdd.getemailToNominate()
    const explanation = nominationToAdd.getExplanation()
    const involvement = nominationToAdd.getInvolvement()
    const overall = nominationToAdd.getOverall()
    const accepted = nominationToAdd.getAccepted()

    var regularExpresion = /%20/gi
    parserExplanation = explanation.replace(regularExpresion,' ')

    insertQuery = `INSERT INTO nominations (userWhoNominate,email,explanation,involvement,overall,accepted) VALUES ("${userWhoNominate}","${userToNominate}","${parserExplanation}",${involvement},${overall},${accepted})`

    console.log(insertQuery)

    return new Promise((resolve , reject) =>
    {

        connection.query(insertQuery, function(err, result)
        {
            if (err) throw err 
            resolve("Nomination added succesfully")
        })
    })
    
} 

function getNominationsNonRejected()
{
    return new Promise((resolve , reject) =>
    {
        connection.query("SELECT * from nominations WHERE accepted = 1", function(err, result)
        {
            if (err) throw err 
            resolve(result)
        })
    })
}

module.exports = 
{
    addNominationToDb,
    getNominationsNonRejected
}