const form = document.getElementById('reserve-form');
const user = document.getElementById('user');
const password = document.getElementById('password');
const tables = document.querySelectorAll('.table');
let displayIdTable = document.getElementById('display-id-table');
let displayStatusTable = document.getElementById('display-status-table');

let allTables = [
    '', {
        "id": 1,
        "reserved": false,
        "user": ''
    }, {
        "id": 2,
        "reserved": false,
        "user": ''
    }, {
        "id": 3,
        "reserved": false,
        "user": ''
    }, {
        "id": 4,
        "reserved": false,
        "user": ''
    }, {
        "id": 5,
        "reserved": false,
        "user": ''
    }, {
        "id": 6,
        "reserved": false,
        "user": ''
    }, {
        "id": 7,
        "reserved": false,
        "user": ''
    }, {
        "id": 8,
        "reserved": false,
        "user": ''
    }, {
        "id": 9,
        "reserved": false,
        "user": ''
    }, {
        "id": 10,
        "reserved": false,
        "user": ''
    }
];

const getUserData = function (user) {
    return fetch('http://localhost:3000/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            return users.find(u => u.user === user) || false;
        })
        .catch(error => {
            console.error('Error:', error);
            return false;
        });
};

const validateUser = function (user, password) {
    return getUserData(user)
        .then(userData => {
            if (userData) {
                if (userData.password === password) {
                    return true;
                } else {
                    alert('Senha incorreta');
                    return false; 
                }
            } else {
                alert('Usuário não encontrado');
                return false; 
            }
        });
};

const tableAvailability = function (tableId) {
    return !allTables[tableId].reserved;
};

const updateTableStatus = function (table) {
    allTables[table.id].reserved = true;
    alert('Reserva feita');
};

const getTableData = function (tableId) {
    return allTables[tableId];
};

const changeDisplayId = function (tableId) {
    displayIdTable.innerText = tableId;
};

const changeDisplayStatus = function (status) {
    displayStatusTable.innerText = status;
};


const reserveTable = function (username, password, tableId) {
    validateUser(username, password)
        .then(isValid => {
            if (isValid) {
                if (tableAvailability(Number(tableId))) {
                    let table = getTableData(tableId);
                    updateTableStatus(table);
                    changeDisplayStatus('Reservada');
                } else {
                    alert('Mesa não disponível');
                }
            }
        });
};


const updateReserveInfo = function () {
    const tableId = this.id; 
    changeDisplayId(tableId);
    const tableData = allTables[tableId];
    const status = tableData.reserved ? 'Reservada' : 'Disponível';
    changeDisplayStatus(status);
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const tableId = displayIdTable.innerText;
    reserveTable(user.value, password.value, tableId);
});

tables.forEach(table => {
    table.addEventListener('click', updateReserveInfo);
});
