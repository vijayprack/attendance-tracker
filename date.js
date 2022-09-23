const dateTime = new Date();
const ISTOffset = 330;
const offset = ISTOffset * 60 * 1000;
const ISTTime = new Date(dateTime.getTime() + offset);
const newdate = ISTTime.toString().slice(0,15);
const date = newdate.replace(/ /g, '');

module.exports = date;