const { client } = require("../connection");
const {checkinDate} = require("./date");


const getCheckinData = (req, res) => {
    client.query('SELECT * FROM checkin ORDER BY employee_id ASC', (error, data) => {
        if (error){
            return res.status(400).json({"Status Code": 400, "Message": "Bad Request"})
        };
        res.status(200).json(data.rows)
    });
};


const getCheckinDataById = (req, res) => {
    const id = parseInt(req.params.id);

    client.query(`SELECT * FROM checkin WHERE employee_id = $1`, [id], (error, data) => {
        if (error){
            return res.status(404).json({"Status Code": 404, "Message": "Not Found"})
        };
        res.status(200).json(data.rows)
    });
};


const addEmployeeInCheckIn = (req, res) => {
    const employee_id = req.body.employee_id;

    client.query(`INSERT INTO checkin (employee_id) VALUES ($1) RETURNING *;`,
    [employee_id],
    (error, data) => {
        if (error){
            return res.status(400).json({"Status Code": 400, "Message": "Bad Request"})
        };
        res.status(201).send(`Employee added with ID: ${data.rows[0]['id']} 
                             and Employee ID: ${employee_id}`)
    });
};


const updateEmployeeInCheckIn = (req, res) => {
    const id = parseInt(req.params.id);
    
    client.query(`UPDATE checkin  SET ${checkinDate} = now(), 
    updated_at = now() WHERE employee_id = $1`,
    [id],
    (error, data) => {
        if (error){
            return res.status(404).json({"Status Code": 404, "Message": "Not Found"})
        };
        res.status(200).send(`ID: ${id} is checked in`);
    });
};


const deleteEmployeeInCheckIn = (req, res) => {
    const id = parseInt(req.params.id);

    client.query('DELETE FROM checkin WHERE employee_id = $1;', [id], (error, data) => {
        if (error){
            return res.status(404).json({"Status Code": 404, "Message": "Not Found"})
        };
        res.status(200).send(`Employee deleted with ID: ${id}`)
    });
};


module.exports = {
    getCheckinData,
    getCheckinDataById,
    addEmployeeInCheckIn,
    updateEmployeeInCheckIn,
    deleteEmployeeInCheckIn
};