const {connection, createDatabase, closeDatabase} = require('../data/database/connection')
const NominationClass = require('../data/Nomination')
const {sendMail} = require('../data/mailing/mailing')

async function addNominationToDb(nominationToAdd)
{
    const userWhoNominate = nominationToAdd.getUserWhoNominate()
    const userToNominate = nominationToAdd.getemailToNominate()
    const explanation = nominationToAdd.getExplanation()
    const involvement = nominationToAdd.getInvolvement()
    const overall = nominationToAdd.getOverall()
    const accepted = nominationToAdd.getAccepted()

    var regularExpresion = /%20/gi
    parserExplanation = explanation.replace(regularExpresion,' ')

    var isNominated = await isNominatedEmailInBD(userToNominate)

    if ( isNominated != 0 )
    {
        return new Promise((resolve , reject) =>
        {
            resolve(false)
        })
    }
    else
    {
        insertQuery = `INSERT INTO nominations (userWhoNominate,email,explanation,involvement,overall,accepted) VALUES ("${userWhoNominate}","${userToNominate}","${parserExplanation}",${involvement},${overall},${accepted})`
        sendMail(userWhoNominate , userToNominate)
        return new Promise((resolve , reject) =>
        {
    
            connection.query(insertQuery, function(err, result)
            {
                if (err) throw err 
                resolve(true)
            })
        })
        
    }  
} 

function isNominatedEmailInBD(userToNominate)
{
    searchNominatedEmailQuery = `SELECT * from nominations WHERE email ="${userToNominate}" `
    return new Promise((resolve , reject) =>
    {

        connection.query(searchNominatedEmailQuery, function(err, result)
        {
            if (err) throw err 
            resolve( result.length )
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