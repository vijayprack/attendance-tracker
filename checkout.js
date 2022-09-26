const express = require('express');
const router = express.Router();

const {
    getCheckOutData,
    getCheckOutDataById,
    addEmployeeInCheckOut,
    updateEmployeeInCheckOut,
    deleteEmployeeInCheckOut
} = require('./api/checkout');

router.route('/').get(getCheckOutData).post(addEmployeeInCheckOut);
router.route('/:id').get(getCheckOutDataById).patch(updateEmployeeInCheckOut)
.delete(deleteEmployeeInCheckOut);

module.exports = router;