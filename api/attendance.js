const { client } = require("../connection");
const {checkinDate, checkoutDate} = require("./date");


const getAttendanceData = (req, res) => {
    client.query(`SELECT employees.id, employees.first_name, employees.last_name, 
            checkin.${checkinDate}, checkout.${checkoutDate} FROM employees 
            INNER JOIN checkin ON employees.id=checkin.employee_id 
            INNER JOIN checkout ON employees.id=checkout.employee_id 
            ORDER BY id ASC;`,
            (error, data) => {
        if (error){
            throw error;
        };
        res.status(200).json(data.rows);
    });
};


const getAttendanceById = (req, res) => {
    const id = parseInt(req.params.id);

    client.query(`SELECT employees.id, employees.first_name, employees.last_name, 
    checkin.${checkinDate}, checkout.${checkoutDate} FROM employees INNER JOIN checkin 
    ON employees.id=checkin.employee_id INNER JOIN checkout ON 
    employees.id=checkout.employee_id WHERE employees.id = $1`, [id], (error, data) => {
        if (error){
            throw error;
        };
        res.status(200).json(data.rows);
    });
};

module.exports = {
    getAttendanceData,
    getAttendanceById
}
    