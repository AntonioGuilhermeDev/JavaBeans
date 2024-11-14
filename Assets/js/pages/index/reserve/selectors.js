const form = document.getElementById('reserve-form');
const user = document.getElementById('user');
const password = document.getElementById('password');
const tables = document.querySelectorAll('.table');
let displayIdTable = document.getElementById('display-id-table');
let displayStatusTable = document.getElementById('display-status-table');
let date = document.getElementById('date');
const errorMessage = document.getElementById('error-message'); 

const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal');

const currentDate = new Date();
const select = document.getElementById('time');


export {form, user, password, tables, displayIdTable, displayStatusTable, date, errorMessage, modal, closeModalButton, currentDate, select};