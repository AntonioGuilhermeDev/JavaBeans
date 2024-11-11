import validate from './validate.js';
import {form, user, password, modal, closeModalButton} from './selectors.js';


form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const existingWarnings = document.querySelectorAll('.error-warning');
    existingWarnings.forEach(warning => warning.remove());

    const validationError = validate.validateFields(user.value, password.value);
    if (validationError) {
        const errorMessage = validate.createWarning(validationError); 
        form.insertAdjacentElement('afterbegin', errorMessage); 
        return; 
    }

    validate.signInUser(user.value, password.value);
});
closeModalButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});