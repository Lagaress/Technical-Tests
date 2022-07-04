const { connect } = require('http2');
var mysql = require('mysql'); 
var connection = mysql.createConnection({
    host: "localhost",
    user: "localhost",
    password: "root"
});

connection.connect(function(err) 
{
    try 
    {
        establishConnection(err) ;
    }
    catch
    {
        console.log("Some error have ocurred trying to establish a connection with database, please check the log file");
    }
    
});

function establishConnection(err)
{
    if (err) 
    {
        throw err;
    }    
    console.log("Connected!");
    connection.query("use nova" , function(err)
    {
        if (err && err.code == 'ER_BAD_DB_ERROR')
        {
            createDatabase() ;
        }
    });
}

function createDatabase()
{
    connection.query("CREATE DATABASE nova" , function(err)
    {
        if (err) throw err ; 
        console.log("Database nova created successfully!") ;
        connection.query("use nova") ;
        createNominationTable() ;
    }) ;
}

function createNominationTable()
{
    var createNominationTable = "CREATE TABLE IF NOT EXISTS nominations (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(50), explanation VARCHAR(255), involvement INT, overall INT, accepted BOOL)";
    connection.query(createNominationTable, function (err) {
        if (err) throw err;
        console.log("Table created successfully");
    });
}