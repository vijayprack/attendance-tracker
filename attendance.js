const express =require('express');
const attendance = express.Router();

const { getAttendanceData, getAttendanceById } = require('./api/attendance');

attendance.route('/').get(getAttendanceData);
attendance.route('/:id').get(getAttendanceById);

module.exports = attendance;