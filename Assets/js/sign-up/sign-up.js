import signUpValidate from './validate.js';
import {signUpForm, username, email, password, confirmPassword} from './selectors.js';

signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    signUpValidate.clearWarnings();
    
    const error = signUpValidate.validateFields(username, email, password, confirmPassword);  // Usando a função importada
    if (error) {
        const errorMessage = signUpValidate.createWarning(error);  // Usando a função importada
        signUpForm.insertAdjacentElement('afterbegin', errorMessage);
    } else {
        signUpValidate.addUser(username.value, email.value, password.value)
        alert('Usuário Registrado')
    }
});