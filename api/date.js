const dateTime = new Date();
const idianTime = dateTime.toString()
const newdate = idianTime.toString().slice(0,15);
const date = newdate.replace(/ /g, '_');

const checkinDate = 'ci_' + date;
const checkoutDate = 'co_' + date

module.exports = {
    checkinDate,
    checkoutDate
};