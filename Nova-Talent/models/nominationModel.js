const { callbackify } = require('util')
const {connection} = require('../database/connection')

function addNominationToDb()
{

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