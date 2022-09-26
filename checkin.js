const express = require('express');
const checkin = express.Router();

const {
    getCheckinData,
    getCheckinDataById,
    addEmployeeInCheckIn,
    updateEmployeeInCheckIn,
    deleteEmployeeInCheckIn
} = require('./api/checkin');

checkin.route('/').get(getCheckinData).post(addEmployeeInCheckIn);
checkin.route('/:id').get(getCheckinDataById).patch(updateEmployeeInCheckIn)
.delete(deleteEmployeeInCheckIn);

module.exports = checkin