let allTables = [
    '', 
    {
        "id": 1,
        "reserved": false,
        "user": '',
        'time': ''
    }, 
    {
        "id": 2,
        "reserved": false,
        "user": '',
        'time': ''
    }, 
    {
        "id": 3,
        "reserved": false,
        "user": '',
        'time': ''
    }, 
    {
        "id": 4,
        "reserved": false,
        "user": '',
        'time': ''
    }, 
    {
        "id": 5,
        "reserved": false,
        "user": '',
        'time': ''
    }, 
    {
        "id": 6,
        "reserved": false,
        "user": '',
        'time': ''
    }, 
    {
        "id": 7,
        "reserved": false,
        "user": '',
        'time': ''
    }, 
    {
        "id": 8,
        "reserved": false,
        "user": '',
        'time': ''
    }, 
    {
        "id": 9,
        "reserved": false,
        "user": '',
        'time': ''
    }, 
    {
        "id": 10,
        "reserved": false,
        "user": '',
        'time': ''
    }
];

function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    return code;
}

function openModal() {
    const code = generateRandomCode();
    const modalText = document.getElementById('modal-text');
    modalText.innerText = `Código de Reserva: ${code}`;

    modal.style.display = 'flex'; 
}

function closeModal() {
    modal.style.display = 'none'; 
}

const displayReservations = function () {
    console.clear(); 
    console.log("Estado Atual das Mesas (allTables):");
    allTables.forEach(table => {
        console.log(`Mesa ${table.id}: ${table.reserved ? 'Reservada' : 'Disponível'} | Usuário: ${table.user} | Horário: ${table.time}`);
    });
};

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

const showError = function (errorElement, message) {
    hideError(errorElement); 
    errorElement.innerText = message; 
    errorElement.style.display = 'block';

    setTimeout(() => hideError(errorElement), 3000);
};

const hideError = function (errorElement) {
    errorElement.innerText = ''; 
    errorElement.style.display = 'none'; 
};

const validateUser = function (user, password, errorElement) {
    hideError(errorElement); 
    return getUserData(user)
        .then(userData => {
            if (userData) {
                if (userData.password === password) {
                    return true;
                } else {
                    showError(errorElement,'Senha incorreta'); 
                    return false; 
                }
            } else {
                showError(errorElement,'Usuário não encontrado'); 
                return false; 
            }
        });
};

const tableAvailability = function (tableId) {
    return !allTables[tableId].reserved;
};

const updateTableStatus = function (table, username, time) {
    allTables[table.id].reserved = true;
    allTables[table.id].user = username;
    allTables[table.id].time = time; 
    displayReservations(); 
};

const getTableData = function (tableId) {
    return allTables[tableId];
};

const changeDisplayId = function (displayIdTable,tableId) {
    displayIdTable.innerText = tableId;
};

const changeDisplayStatus = function (displayStatusTable,status) {
    displayStatusTable.innerText = status;
};

const reserveTable = function (username, password, tableId, time, errorElement, displayStatusTable) {
    hideError(errorElement); 
    validateUser(username, password, errorElement)
        .then(isValid => {
            if (isValid) {
                if (tableAvailability(Number(tableId))) {
                    let table = getTableData(tableId);
                    updateTableStatus(table, username, time);
                    changeDisplayStatus(displayStatusTable, 'Reservada');
                    openModal(); 
                } else {
                    showError(errorElement,'Mesa não disponível'); 
                }
            }
        });
};

const updateReserveInfo = function (displayIdTable, displayStatusTable, table) {
    const tableId = table.id;
    changeDisplayId(displayIdTable,tableId);
    const tableData = allTables[tableId];
    const status = tableData.reserved ? 'Reservada' : 'Disponível';
    changeDisplayStatus(displayStatusTable, status);
}

export default {
    generateRandomCode,
    openModal,
    closeModal,
    displayReservations,
    getTableData,
    showError,
    hideError,
    validateUser,
    tableAvailability,
    updateTableStatus,
    getTableData,
    changeDisplayId,
    changeDisplayStatus,
    reserveTable,
    updateReserveInfo
};