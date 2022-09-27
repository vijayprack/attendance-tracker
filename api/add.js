const { client } = require("../connection");
const {checkinDate, checkoutDate} = require("./date");

const addColumn = (req, res) => {
    client.query(`ALTER TABLE checkin ADD ${checkinDate} time
                ALTER TABLE Checkout ADD ${checkoutDate} time;`,
    (error, data) => {
        if (error){
            return res.status(400).json({"Status Code": 400, "Message": "Bad Request"})
        };
        res.status(200).send('New date column is added in checkin and checkout tables.')
    });
};


// const addEmployee = (req, res) => {
//     const employee_id = req.body.employee_id;

//     client.query(`INSERT INTO checkin (employee_id) VALUES ($1) RETURNING * 
//                 INSERT INTO checkout (employee_id) VALUES ($1) RETURNING *;`, 
//     [employee_id], 
//     (error, data) => {
//         if (error){
//             throw error;
//         };
//         res.status(201).send(`Employee added with ID: ${employee_id}`)
//     });
// };


// const deleteEmployee = (req, res) => {
//     const id = parseInt(req.params.id);

//     client.query(`DELETE FROM checkin WHERE employee_id = $1;
//                 DELETE FROM checkin WHERE employee_id = $1;`, 
//         [id], 
//         (error, data) => {
//         if (error){
//             throw error;
//         };
//         res.status(200).send(`Employee deleted with ID: ${id}`)
//     });
// };

module.exports = addColumn;
