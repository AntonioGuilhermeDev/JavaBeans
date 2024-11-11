import validate from './validate.js';
import { form, user, password, tables, displayIdTable, displayStatusTable, date, errorMessage, modal, closeModalButton, currentDate, select} from './selectors.js';

currentDate.setDate(currentDate.getDate() + 1);
date.innerText = currentDate.toLocaleDateString('pt-BR');

for (let hour = 9; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
        const value = hour.toString().padStart(2, '0') + ':' + (minute === 0 ? '00' : '30');
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const tableId = displayIdTable.innerText;
    const selectedTime = select.value; 

    if (user.value.trim() === '') {
        validate.showError(errorMessage,'Por favor, insira o nome de usuário.'); 
        return; 
    }

    if (password.value.trim() === '') {
        validate.showError(errorMessage,'Por favor, insira a senha.'); 
        return; 
    }

    
    if (selectedTime === '') {
        validate.showError(errorMessage,'Por favor, selecione um horário.'); 
        return; 
    }

   
    validate.reserveTable(user.value, password.value, tableId, selectedTime, errorMessage, displayStatusTable);
});

closeModalButton.addEventListener('click', validate.closeModal);

tables.forEach(table => {
    table.addEventListener('click', function () {
        validate.updateReserveInfo(displayIdTable, displayStatusTable, table);
    });
});


