const { client } = require("../connection");
const {checkoutDate} = require("./date");


const getCheckOutData = (req, res) => {
    client.query('SELECT * FROM checkout ORDER BY employee_id ASC', (error, result) => {
        if (error){
            return res.status(400).json({"Status Code": 400, "Message": "Bad Request"})
        };
        res.status(200).json(result.rows)
    });
};


const getCheckOutDataById = (req, res) => {
    const id = parseInt(req.params.id);

    client.query(`SELECT * FROM checkout WHERE employee_id = $1`, [id], (error, data) => {
        if (error){
            return res.status(404).json({"Status Code": 404, "Message": "Not Found"})
        };
        res.status(200).json(data.rows)
    });
};


const addEmployeeInCheckOut = (req, res) => {
    const employee_id = req.body.employee_id;

    client.query(`INSERT INTO checkout (employee_id)
    VALUES ($1) RETURNING *`, [employee_id], (error, data) => {
        if (error){
            return res.status(400).json({"Status Code": 400, "Message": "Bad Request"})
        };
        res.status(201).send(`Employee added with ID: ${data.rows[0]['id']} 
                             and Employee ID: ${employee_id}`)
    });
};


const updateEmployeeInCheckOut = (req, res) => {
    const id = parseInt(req.params.id);
    
    client.query(`UPDATE checkout  SET ${checkoutDate} = now(), 
                updated_at = now() WHERE employee_id = $1`,
    [id],
    (error, data) => {
        if (error){
            return res.status(404).json({"Status Code": 404, "Message": "Not Found"})
        };
        res.status(200).send(`ID: ${id} is checked out`)
    });
};


const deleteEmployeeInCheckOut = (req, res) => {
    const id = parseInt(req.params.id);

    client.query('DELETE FROM checkout WHERE employee_id = $1', [id], (error, data) => {
        if (error){
            return res.status(404).json({"Status Code": 404, "Message": "Not Found"})
        };
        res.status(200).send(`Employee deleted with ID: ${id}`)
    });
};


module.exports = {
    getCheckOutData,
    getCheckOutDataById,
    addEmployeeInCheckOut,
    updateEmployeeInCheckOut,
    deleteEmployeeInCheckOut
};