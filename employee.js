const express = require('express');
const employee = express.Router();

const {
    getEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
} = require('./api/employee');

employee.route('/').get(getEmployees).post(addEmployee);
employee.route('/:id').get(getEmployeeById).patch(updateEmployee).delete(deleteEmployee);

module.exports = employee;