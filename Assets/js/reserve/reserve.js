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
currentDate.setDate(currentDate.getDate() + 1);
date.innerText = currentDate.toLocaleDateString('pt-BR');

const select = document.getElementById('time');

for (let hour = 9; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
        const value = hour.toString().padStart(2, '0') + ':' + (minute === 0 ? '00' : '30');
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    }
}

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

closeModalButton.addEventListener('click', closeModal);


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

const showError = function (message) {
    hideError(); 
    errorMessage.innerText = message; 
    errorMessage.style.display = 'block';

    setTimeout(hideError, 3000);
};

const hideError = function () {
    errorMessage.innerText = ''; 
    errorMessage.style.display = 'none'; 
};

const validateUser = function (user, password) {
    hideError(); 
    return getUserData(user)
        .then(userData => {
            if (userData) {
                if (userData.password === password) {
                    return true;
                } else {
                    showError('Senha incorreta'); 
                    return false; 
                }
            } else {
                showError('Usuário não encontrado'); 
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

const changeDisplayId = function (tableId) {
    displayIdTable.innerText = tableId;
};

const changeDisplayStatus = function (status) {
    displayStatusTable.innerText = status;
};

const reserveTable = function (username, password, tableId, time) {
    hideError(); 
    validateUser(username, password)
        .then(isValid => {
            if (isValid) {
                if (tableAvailability(Number(tableId))) {
                    let table = getTableData(tableId);
                    updateTableStatus(table, username, time);
                    changeDisplayStatus('Reservada');
                    openModal(); 
                } else {
                    showError('Mesa não disponível'); 
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
    const selectedTime = select.value; 

    if (user.value.trim() === '') {
        showError('Por favor, insira o nome de usuário.'); 
        return; 
    }

    if (password.value.trim() === '') {
        showError('Por favor, insira a senha.'); 
        return; 
    }

    
    if (selectedTime === '') {
        showError('Por favor, selecione um horário.'); 
        return; 
    }

   
    reserveTable(user.value, password.value, tableId, selectedTime);
});

tables.forEach(table => {
    table.addEventListener('click', updateReserveInfo);
});


