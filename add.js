const express = require('express');
const column = express.Router();

const addColumn = require('./api/add');

column.route('/').get(addColumn);

module.exports = column;