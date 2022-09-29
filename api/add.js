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


module.exports = addColumn;
