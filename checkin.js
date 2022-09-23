const { client } = require("./connection");
const express = require("express");
const checkin = express();
const date = require("./date");


checkin.get('/addColumn', addcolumn = (req, res) => {
    client.query(`ALTER TABLE checkin ADD ${date} time`, (error, data) => {
        if (error){
            throw error;
        };
        res.status(200).send('Column is added in checkin table.')
    });
});


// employee.get('/', getEmployees = (req, res) => {
//     client.query('SELECT * FROM employees ORDER BY id ASC', (error, data) => {
//         if (error){
//             throw error;
//         };
//         res.status(200).json(data.rows)
//     });
// });

checkin.get('/', getCheckinData = (req, res) => {
    client.query('SELECT * FROM checkin ORDER BY employee_id ASC', (error, data) => {
        if (error){
            throw error;
        };
        res.status(200).json(data.rows)
    });
});


checkin.get('/:id', getCheckinDataById = (req, res) => {
    const id = parseInt(req.params.id);

    client.query(`SELECT * FROM checkin WHERE employee_id = $1`, [id], (error, data) => {
        if (error){
            throw error;
        };
        res.status(200).json(data.rows)
    });
});


checkin.post('', addEmployeeInCheckIn = (req, res) => {
    const employee_id = req.body.employee_id;

    client.query(`INSERT INTO checkin (employee_id)
    VALUES ($1) RETURNING *`, [employee_id], (error, data) => {
        if (error){
            throw error;
        };
        res.status(201).send(`Employee added with ID: ${data.rows[0]['id']} 
                             and Employee ID: ${employee_id}`)
    });
});


checkin.patch('/:id', updateEmployeeInCheckIn = (req, res) => {
    const id = parseInt(req.params.id);
    
    client.query(`UPDATE checkin  SET ${date} = now(), updated_at = now() WHERE employee_id = $1`,
    [id],
    (error, data) => {
        if (error){
            throw error;
        };
        res.status(200).send(`ID: ${id} is checked in`)
    });
});


checkin.delete('/:id', deleteEmployeeInCheckIn = (req, res) => {
    const id = parseInt(req.params.id);

    client.query('DELETE FROM checkin WHERE employee_id = $1', [id], (error, data) => {
        if (error){
            throw error;
        };
        res.status(200).send(`Employee deleted with ID: ${id}`)
    });
});


checkin.get('/checkout/addColumn', addcolumn = (req, res) => {
    var dateTime = new Date();
    var date = dateTime.toISOString().slice(0,10);
    var newDate = 'd' + date.replace(/-/g, '');

    client.query(`ALTER TABLE checkout ADD ${newDate} time`, (error, data) => {
        if (error){
            res.send("Could Not Get Response.");
        };
        res.status(200).send('Column is added in checkout table.')
    });
});


module.exports = checkin