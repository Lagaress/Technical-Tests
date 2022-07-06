const {connection} = require('../data/database/connection')
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
        return new Promise((resolve) =>
        {
            resolve(false)
        })
    }
    else
    {
        insertQuery = `INSERT INTO nominations (userWhoNominate,email,explanation,involvement,overall,accepted) VALUES ("${userWhoNominate}","${userToNominate}","${parserExplanation}",${involvement},${overall},${accepted})`
        return new Promise((resolve, reject) =>
        {
            connection.query(insertQuery, function(err)
            {
                if (err)
                {
                    reject(err)
                }
                else
                {
                    sendEmailIfItsNecessary([userWhoNominate,userToNominate] , accepted)
                    resolve(true)    
                }
            })
        })
    }  
} 

function sendEmailIfItsNecessary(arrayEmails , accepted)
{
    if (accepted == false)
    {
        sendMail(arrayEmails[0] , arrayEmails[1])
    }
}

function isNominatedEmailInBD(userToNominate)
{
    searchNominatedEmailQuery = `SELECT * from nominations WHERE email ="${userToNominate}" `
    
    return new Promise((resolve, reject) =>
    {
        connection.query(searchNominatedEmailQuery, function(err, result)
        {
            if (err)
            {
                reject(err)
            }
            else
            {
                resolve(result.length)
            }
        })
    })
}

function getNominationsNonRejected()
{
    return new Promise((resolve, reject) =>
    {
        connection.query("SELECT * from nominations WHERE accepted = 1", function(err, result)
        {
            if (err)
            {
                reject(err)
            }
            else
            {
                resolve(result)
            }
        })
    })       
}

function createDatabaseIfNotExist()
{
    connection.query("use nova" , function(err)
    {
        if (err)
        {
            createDataseFirstTime()        
            console.log("Database ready to use") 
        }
    }) 
}

function createDataseFirstTime()
{
    createNovaDatabase()
    connection.query("use nova") 
    createNominationTable() 
}

function createNovaDatabase()
{
    connection.query("CREATE DATABASE IF NOT EXISTS nova" , function(err)
    {
        if (err) 
        {
            throw err
        }     
    }) 
}

function createNominationTable()
{
    var createNominationTable = "CREATE TABLE IF NOT EXISTS nominations (id INT AUTO_INCREMENT PRIMARY KEY, userWhoNominate VARCHAR(50),  email VARCHAR(50), explanation VARCHAR(255), involvement INT, overall INT, accepted BOOL)";
    connection.query(createNominationTable, function (err) {
        if (err) 
        {
            throw err
        }
    })
}

module.exports = 
{
    addNominationToDb,
    getNominationsNonRejected,
    createDatabaseIfNotExist
}