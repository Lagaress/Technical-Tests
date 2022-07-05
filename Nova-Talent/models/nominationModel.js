const {connection} = require('../data/database/connection')

function addNominationToDb(nominationToAdd)
{
    return new Promise((resolve , reject) =>
    {
      // insertQuery = 'INSERT INTO nominations (userWhoNominate,email,explanation,involvement,overall,accepted) VALUES ('nominationToAdd.getUserWhoNominate(),nominationToAdd.getemailToNominate(),nominationToAdd.getExplanation(),nominationToAdd.getInvolvement(),nominationToAdd.getOverall()')'

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