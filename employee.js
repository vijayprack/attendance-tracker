const { client } = require("./connection");
const express = require("express");
const employee = express();


employee.get('/', getEmployees = (req, res) => {
    client.query('SELECT * FROM employees ORDER BY id ASC', (error, data) => {
        if (error){
            throw error;
        };
        res.status(200).json(data.rows);
    });
});


employee.get('/:id', getEmployeeById = (req, res) => {
    const id = parseInt(req.params.id);

    client.query(`SELECT * FROM employees WHERE id = $1`, [id], (error, data) => {
        if (error){
            throw error;
        };
        res.status(200).json(data.rows)
    });
});


employee.post('/', addEmployee = (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const mobile_no = req.body.mobile_no;
    const email_id = req.body.email_id;

    client.query(`INSERT INTO employees (first_name, last_name, mobile_no, email_id)
    VALUES ($1, $2, $3, $4) RETURNING *`,
    [first_name, last_name, mobile_no, email_id],
    (error, data) => {
        if (error){
            throw error;
        };
        res.status(201).send(`Employee added with ID: ${data.rows[0]['id']}`)
    });
});


employee.patch('/:id', updateEmployee = (req, res) => {
    const id = parseInt(req.params.id)
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const mobile_no = req.body.mobile_no;
    const email_id = req.body.email_id;

    client.query(`UPDATE employees  SET first_name = $1, last_name = $2, mobile_no = $3, 
    email_id = $4 WHERE id = $5`,
    [first_name, last_name, mobile_no, email_id, id],
    (error, data) => {
        if (error){
            throw error;
        };
        res.status(200).send(`Employee modified with ID: ${id}`)
    });
});


employee.delete('/:id', deleteEmployee = (req, res) => {
    const id = parseInt(req.params.id);

    client.query('DELETE FROM employees WHERE id = $1', [id], (error, data) => {
        if (error){
            throw error;
        };
        res.status(200).send(`Employee deleted with ID: ${id}`);
    });
});

module.exports = employee;
