var { Client } = require('pg');
var client = new Client({
    host: "localhost",
    database: "attendance_traker",
    user: "vijay",
    password: "password",
    port: 5432
});

client.connect(function(error){
    if(error){
        throw error;
    };
    console.log("connected to postgresql")
});

module.exports = { client }
