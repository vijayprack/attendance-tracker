const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const employee = require('./employee');
const add = require('./add');
const checkin = require('./checkin');
const checkout = require('./checkout');
const attendance = require('./attendance');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welome to Attendance Traker.')
});

app.use('/employee', employee);
app.use('/add', add);
app.use('/checkin', checkin);
app.use('/checkout', checkout);
app.use('/attendance', attendance);


const server =app.listen(3000, function(){
    const host = server.address().address = "127.0.0.1";
    const port = server.port = 3000;
    console.log(`Attendance traker api is listening at http://${host}:${port}`);
});