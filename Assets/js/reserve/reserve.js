const form = document.getElementById('reserve-form');
const user = document.getElementById('user');
const password = document.getElementById('password');
const tables = document.querySelectorAll('.table');
let displayIdTable = document.getElementById('display-id-table');
let displayStatusTable = document.getElementById('display-status-table');
let date = document.getElementById('date');
const errorMessage = document.getElementById('error-message'); // Referência ao parágrafo de erro

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

// A função para exibir a lista completa de allTables no console
const displayReservations = function () {
    console.clear(); // Limpa o console antes de exibir as reservas
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
    hideError(); // Oculta qualquer mensagem de erro anterior
    errorMessage.innerText = message; // Atualiza o texto do parágrafo
    errorMessage.style.display = 'block'; // Exibe o parágrafo

    // Retira a mensagem após três segundos
    setTimeout(hideError, 3000);
};

const hideError = function () {
    errorMessage.innerText = ''; // Limpa o texto do parágrafo
    errorMessage.style.display = 'none'; // Oculta o parágrafo
};

const validateUser = function (user, password) {
    hideError(); // Oculta qualquer mensagem de erro anterior
    return getUserData(user)
        .then(userData => {
            if (userData) {
                if (userData.password === password) {
                    return true;
                } else {
                    showError('Senha incorreta'); // Exibe mensagem de erro
                    return false; 
                }
            } else {
                showError('Usuário não encontrado'); // Exibe mensagem de erro
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
    allTables[table.id].time = time; // Armazena o horário selecionado
    alert('Reserva feita para ' + username + ' às ' + time);
    displayReservations(); // Atualiza a lista de reservas no console
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
    hideError(); // Oculta qualquer mensagem de erro anterior
    validateUser(username, password)
        .then(isValid => {
            if (isValid) {
                if (tableAvailability(Number(tableId))) {
                    let table = getTableData(tableId);
                    updateTableStatus(table, username, time);
                    changeDisplayStatus('Reservada');
                } else {
                    showError('Mesa não disponível'); // Exibe mensagem de erro
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
    const selectedTime = select.value; // Obtenha o horário selecionado

    // Verifica se o usuário foi inserido
    if (user.value.trim() === '') {
        showError('Por favor, insira o nome de usuário.'); // Exibe mensagem de erro
        return; // Interrompe a execução se o usuário não estiver preenchido
    }

    // Verifica se a senha foi inserida
    if (password.value.trim() === '') {
        showError('Por favor, insira a senha.'); // Exibe mensagem de erro
        return; // Interrompe a execução se a senha não estiver preenchida
    }

    // Verifica se o horário foi selecionado
    if (selectedTime === '') {
        showError('Por favor, selecione um horário.'); // Exibe mensagem de erro
        return; // Interrompe a execução se nenhum horário for selecionado
    }

    // Chama a função reserveTable após as validações
    reserveTable(user.value, password.value, tableId, selectedTime);
});

tables.forEach(table => {
    table.addEventListener('click', updateReserveInfo);
});


