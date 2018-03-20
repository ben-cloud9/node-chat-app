//1st Jan 1970 00:00:00 am
const moment = require('moment');
// var date = new Date();
//
// console.log(date.getMonth());

var createdAt = 123
var date = moment(createdAt);
console.log(date.format('Do MMM YYYY h:mm:ssa'));

//10:35 am
