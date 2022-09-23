const employee = require('./employee')
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const checkin = require('./checkin');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('', employee);
app.use('/checkin', checkin);


const server =app.listen(3000, function(){
    const host = server.address().address = "127.0.0.1"
    const port = server.port = 3000
    console.log(`Attendance traker api is listening at http://${host}:${port}`)
});